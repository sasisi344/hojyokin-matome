---
name: hojyokin-namagomi-refs
description: 兄弟リポジトリ namagomi-techo の自治体マスタ・公式URL索引を参照する。都道府県スラッグの正規化、市区町村名の網羅確認、.lg.jp 公式URLのたたき台、参照ナレッジの同期が必要なときに使う。
---

# Hojyokin Namagomi Refs Skill

## 目的

[namagomi-techo](https://github.com/sasisi344/namagomi-techo) に蓄積された**自治体情報・公式URL**を、hojyokin-matome から参照ナレッジとして使う。リポジトリ本体の複製や記事本文の流用はしない。

## 正本（読む順）

1. `.workspace/refs/namagomi-techo.md` — 何を借りるか・借りないか
2. `.workspace/refs/municipalities-index.json` — 自治体 slug / 名称 / officialUrl
3. `.workspace/refs/pref-slugs.json` — 都道府県・地方区分マスタ
4. `.workspace/refs/config.json` — 同期元ローカルパス・最終同期日時

## いつ使うか

| 状況 | 参照するもの |
|------|----------------|
| 都道府県スラッグ・地方タグを決める | `pref-slugs.json` |
| 県内の市区町村名を洗い出す | `municipalities-index.json` を `prefSlug` でフィルタ |
| 自治体の `.lg.jp` ドメインを推定する | `officialUrl` からホストを抽出（**別制度のURLであることに注意**） |
| namagomi 側のデータが更新された | `node scripts/sync-namagomi-refs.mjs` を実行 |

## 使わないこと

- `officialUrl` を防犯グッズ・宅配ボックス等の**制度事実**としてそのまま記載しない
- `src/content/blog/subsidy/**` の記事本文をコピーしない
- 生ごみ処理機の補助額・要件を他テーマの記事に転記しない

## 同期コマンド

```bash
node scripts/sync-namagomi-refs.mjs
# または
NAMAGOMI_TECHO_PATH=/path/to/namagomi-techo node scripts/sync-namagomi-refs.mjs
```

初回: `.workspace/refs/README.md` の clone 手順を参照。

## 調査との連携

自治体索引でドメイン・名称を揃えたあと、制度の事実は `.workspace/research/` の A/B/C 信頼度ルールで**自テーマとして再調査**する（Skill: `hojyokin-research`）。
