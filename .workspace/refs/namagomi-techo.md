# namagomi-techo 参照ナレッジ

**リポジトリ**: https://github.com/sasisi344/namagomi-techo  
**テーマ**: 生ごみ処理機の助成金・補助金（自治体別）

hojyokin-matome はルート（344dev）から**独立したリポジトリ**として運用する。ただし自治体の正規化（スラッグ・表示名）と公式 `.lg.jp` URL の調査ノウハウは、兄弟サイトの蓄積を**参照ナレッジ**として活用する。

## 何を借りるか

| 用途 | 参照先 | 本リポジトリでの写し |
|------|--------|----------------------|
| 都道府県スラッグ・地方区分 | `src/lib/blog.ts` の `PREF_TAG_LABEL` / `REGION_MAP` | `.workspace/refs/pref-slugs.json` |
| 自治体名・スラッグ・公式URL | `.workspace/.dataset/pref-date/**/*-article-data.json` | `.workspace/refs/municipalities-index.json` |
| 自治体リスト（日本語名のみ） | 各県の `list.md` / `*-pref-data.md` | 必要時に namagomi-techo を直接読む |
| 公式URL調査の型 | `.workspace/.dataset/deeepresearch/smallgoverment-search.md` | テーマ調査プロンプトに転用可 |
| クエリ台帳の書き方 | `{pref}_生ごみ処理機補助金クエリ一覧.md` の自治体セクション | 自テーマの `sources/official-urls.md` 設計の参考 |

## 何を借りないか

| 対象 | 理由 |
|------|------|
| `src/content/blog/subsidy/**` 記事本文 | テーマ不一致・SEO/著作の重複リスク |
| 制度の金額・期限・要件（生ごみ処理機） | hojyokin-matome の調査対象（防犯・宅配ボックス等）と別制度 |
| `MUNICIPALITY_LABEL` 全体 | 1,100件超・サイト固有。必要な都道府県だけ `municipalities-index.json` で足りる |
| `municipality-recommendations.json` 等の派生統計 | 処理機おすすめ専用・テーマ無関係 |

## `municipalities-index.json` の読み方

各レコードは次の意味を持つ。

- `prefSlug` / `prefName`: 都道府県の正規 ID
- `slug` / `name`: 市区町村の正規 ID・表示名
- `officialUrl`: **生ごみ処理機補助金**の公式ページ（`.lg.jp`）
- `hasSubsidyProgram`: 生ごみ手帖調査時点で制度「あり」か

### 活用例（hojyokin-matome）

1. **自治体の存在確認**: 調査対象県の市区町村名の網羅チェック
2. **ドメインの手がかり**: `officialUrl` から `www.city.*.lg.jp` 等を抽出し、自テーマの `.lg.jp` 内検索の起点にする
3. **スラッグの統一**: 将来サイト実装時、記事・タグの `slug` を兄弟サイトと揃えやすくする

### 使ってはいけないこと

- `officialUrl` を防犯グッズ・宅配ボックス補助の**事実ソース**としてそのまま引用しない（別制度のページである）
- `hasSubsidyProgram` を他テーマの制度有無と混同しない

## ローカルでの参照パス

同期スクリプトは次の順で namagomi-techo を探す。

1. 環境変数 `NAMAGOMI_TECHO_PATH`
2. `../namagomi-techo`（344dev 内の兄弟配置）
3. `.workspace/refs/_vendor/namagomi-techo`（clone 先）

実際に解決されたパスは `.workspace/refs/config.json` の `localPath` に記録される。

## データセット構造（namagomi-techo 側）

```
.workspace/.dataset/
├── INDEX.md              # フォルダ責務・命名規約
├── pref-date/            # 県別一次調査（正本）
│   └── comp-{region}/comp-{pref}/
│       ├── list.md
│       ├── {pref}-article-data.json    # 構造化正本
│       └── {pref}_生ごみ処理機補助金クエリ一覧.md
└── deeepresearch/
    └── smallgoverment-search.md        # .lg.jp 内検索テンプレ
```

`article-data.json` の自治体オブジェクト（抜粋）:

```json
{
  "slug": "karatsu",
  "name": "唐津市",
  "officialUrl": "https://www.city.karatsu.lg.jp/...",
  "officialName": "唐津市 家庭用ごみ処理機器購入費補助金"
}
```

## 更新フロー

namagomi-techo 側で `article-data` が更新されたら:

```bash
node scripts/sync-namagomi-refs.mjs
git add .workspace/refs/
git commit -m "chore: namagomi-techo 参照ナレッジを同期"
```

頻度は月次または大きな県追加時で十分。
