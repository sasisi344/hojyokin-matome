# 外部参照ナレッジ（refs）

兄弟リポジトリや共通マスタから、**複製せず参照できる形**でナレッジを保持する場所です。

## ファイル一覧

| ファイル | 内容 | 更新方法 |
|----------|------|----------|
| [namagomi-techo.md](./namagomi-techo.md) | 生ごみ手帖リポジトリの参照ガイド（何を借りるか・借りないか） | 手動 |
| [config.json](./config.json) | 同期元パス・GitHub URL・最終同期日時 | `sync-namagomi-refs.mjs` |
| [pref-slugs.json](./pref-slugs.json) | 都道府県スラッグ・地方区分マスタ | 同上 |
| [municipalities-index.json](./municipalities-index.json) | 自治体名・スラッグ・公式URL索引（生ごみ処理機補助金由来） | 同上 |

## namagomi-techo の同期

ローカルに [namagomi-techo](https://github.com/sasisi344/namagomi-techo) を clone したうえで:

```bash
# 344dev 内で兄弟配置している場合（デフォルト ../namagomi-techo）
node scripts/sync-namagomi-refs.mjs

# パスを明示する場合
NAMAGOMI_TECHO_PATH=/path/to/namagomi-techo node scripts/sync-namagomi-refs.mjs
```

初回セットアップ例（vendor 配置）:

```bash
git clone https://github.com/sasisi344/namagomi-techo.git .workspace/refs/_vendor/namagomi-techo
node scripts/sync-namagomi-refs.mjs
```

`_vendor/` は `.gitignore` 対象（リポジトリ本体には含めない）。

## AI エージェント向け

自治体の正式名称・スラッグ・`.lg.jp` 公式URLのたたき台が必要なときは、まず本フォルダの JSON を読む。制度の金額・期限など**事実**は hojyokin-matome 側の調査（`.workspace/research/`）で裏取りする。

Skill: `.cursor/skills/hojyokin-namagomi-refs/SKILL.md`
