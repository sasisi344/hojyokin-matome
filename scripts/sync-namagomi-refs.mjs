#!/usr/bin/env node
/**
 * namagomi-techo から参照用ナレッジ（都道府県マスタ・自治体索引）を同期する。
 *
 * 使い方:
 *   node scripts/sync-namagomi-refs.mjs
 *   NAMAGOMI_TECHO_PATH=/path/to/namagomi-techo node scripts/sync-namagomi-refs.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const REFS_DIR = path.join(REPO_ROOT, ".workspace", "refs");
const CONFIG_PATH = path.join(REFS_DIR, "config.json");

const DEFAULT_CANDIDATES = [
	process.env.NAMAGOMI_TECHO_PATH,
	path.join(REPO_ROOT, "..", "namagomi-techo"),
	path.join(REPO_ROOT, ".workspace", "refs", "_vendor", "namagomi-techo"),
].filter(Boolean);

function resolveNamagomiPath() {
	for (const candidate of DEFAULT_CANDIDATES) {
		const resolved = path.resolve(candidate);
		const blogTs = path.join(resolved, "src", "lib", "blog.ts");
		if (fs.existsSync(blogTs)) return resolved;
	}
	throw new Error(
		`namagomi-techo が見つかりません。clone するか NAMAGOMI_TECHO_PATH を設定してください。\n試行: ${DEFAULT_CANDIDATES.join(", ")}`,
	);
}

function extractPrefMaster(blogTsPath) {
	const source = fs.readFileSync(blogTsPath, "utf8");

	const prefBlock = source.match(
		/export const PREF_TAG_LABEL: Record<string, string> = \{([\s\S]*?)\};/,
	);
	if (!prefBlock) throw new Error("PREF_TAG_LABEL を blog.ts から抽出できません");

	const prefTagLabel = {};
	for (const line of prefBlock[1].split("\n")) {
		const m = line.match(/^\s*([a-z0-9-]+):\s*"([^"]+)",?\s*$/);
		if (m) prefTagLabel[m[1]] = m[2];
	}

	const regionBlock = source.match(
		/export const REGION_MAP: \{ label: string; prefs: string\[\] \}\[\] = \[([\s\S]*?)\];/,
	);
	if (!regionBlock) throw new Error("REGION_MAP を blog.ts から抽出できません");

	const regionMap = [];
	const entryRe =
		/\{\s*label:\s*"([^"]+)",\s*prefs:\s*\[([^\]]*)\]\s*\}/g;
	let match;
	while ((match = entryRe.exec(regionBlock[1])) !== null) {
		const prefs = match[2]
			.split(",")
			.map((s) => s.trim().replace(/"/g, ""))
			.filter(Boolean);
		regionMap.push({ label: match[1], prefs });
	}

	return { prefTagLabel, regionMap };
}

function collectArticleDataFiles(prefDateDir) {
	const results = [];
	if (!fs.existsSync(prefDateDir)) return results;

	function walk(dir) {
		for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
			const full = path.join(dir, entry.name);
			if (entry.isDirectory()) {
				walk(full);
			} else if (entry.name.endsWith("-article-data.json")) {
				results.push(full);
			}
		}
	}

	walk(prefDateDir);
	return results.sort();
}

function buildMunicipalityIndex(articleDataPaths) {
	const municipalities = [];
	const seen = new Set();

	for (const filePath of articleDataPaths) {
		const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
		const prefSlug = data.meta?.prefSlug ?? "";
		const prefName = data.meta?.prefName ?? "";
		const confirmedDate = data.meta?.confirmedDate ?? null;

		for (const m of data.municipalities ?? []) {
			const key = `${prefSlug}:${m.slug}`;
			if (seen.has(key)) continue;
			seen.add(key);

			municipalities.push({
				prefSlug,
				prefName,
				slug: m.slug,
				name: m.name,
				officialUrl: m.officialUrl ?? null,
				officialName: m.officialName ?? null,
				hasSubsidyProgram: m.pattern === "A",
				subsidyTheme: "生ごみ処理機",
				sourceConfirmedDate: confirmedDate,
				sourceFile: path.basename(filePath),
			});
		}
	}

	municipalities.sort((a, b) =>
		`${a.prefSlug}:${a.name}`.localeCompare(`${b.prefSlug}:${b.name}`, "ja"),
	);

	return municipalities;
}

function writeJson(filePath, data) {
	fs.mkdirSync(path.dirname(filePath), { recursive: true });
	fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

function main() {
	const namagomiRoot = resolveNamagomiPath();
	const blogTs = path.join(namagomiRoot, "src", "lib", "blog.ts");
	const prefDateDir = path.join(
		namagomiRoot,
		".workspace",
		".dataset",
		"pref-date",
	);

	const { prefTagLabel, regionMap } = extractPrefMaster(blogTs);
	const articleDataPaths = collectArticleDataFiles(prefDateDir);
	const municipalities = buildMunicipalityIndex(articleDataPaths);
	const generatedAt = new Date().toISOString();

	const config = {
		namagomiTecho: {
			github: "https://github.com/sasisi344/namagomi-techo",
			localPath: path.relative(REPO_ROOT, namagomiRoot).replace(/\\/g, "/"),
			datasetRoot: ".workspace/.dataset/pref-date",
			blogTs: "src/lib/blog.ts",
		},
		lastSyncedAt: generatedAt,
	};

	writeJson(CONFIG_PATH, config);

	writeJson(path.join(REFS_DIR, "pref-slugs.json"), {
		source: "namagomi-techo",
		sourcePath: "src/lib/blog.ts",
		generatedAt,
		prefTagLabel,
		regionMap,
	});

	writeJson(path.join(REFS_DIR, "municipalities-index.json"), {
		source: "namagomi-techo",
		sourcePath: ".workspace/.dataset/pref-date/**/*-article-data.json",
		generatedAt,
		count: municipalities.length,
		usageNote:
			"officialUrl は生ごみ処理機補助金の公式ページ。自治体の lg.jp ドメイン・スラッグ正規化の参照用。hojyokin-matome の制度事実としてそのまま流用しない。",
		municipalities,
	});

	console.log(`Synced from: ${namagomiRoot}`);
	console.log(`  pref-slugs.json          (${Object.keys(prefTagLabel).length} prefs)`);
	console.log(`  municipalities-index.json (${municipalities.length} municipalities)`);
	console.log(`  config.json`);
}

main();
