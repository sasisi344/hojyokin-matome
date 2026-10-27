# hojyokin-matome（補助金まとめ）

## 概要

ニッチな補助金・助成金を調査し、都道府県単位でまとめた記事として提供するプロジェクト。自治体ごとの量産記事ではなく、**都道府県1記事**と**独自性**を重視する（詳細は `.workspace/設計図.md`）。

## Cursor / Claude Code 共通運用

本プロジェクトは **Cursor** と **Claude Code** を併用する。どちらに依頼しても同じルール・Skill で対処できるよう、正本を `.agents/` に集約している。

### 優先順位

本リポジトリは **344dev ルートから独立**して運用する。

1. 本書（`CLAUDE.md`）
2. `.cursor/rules/`（Cursor は自動適用。Claude セッションでも同等ルールを適用）
3. **`.agents/skills/`** — Skill の正本
4. 各ツールの入口（正本へ誘導）
   - Cursor: `.cursor/skills/`
   - Claude Code: `.claude/skills/`
5. ユーザー: `~/.claude/settings.json`
6. （ローカルで 344dev モノレポ内に置いている場合のみ参考）`C:\Users\sasis\344dev\CLAUDE.md`

### Skill への導線

| 作業 | 正本（両ツール共通） |
|------|----------------------|
| 補助金の調査・DeepResearch | `.agents/skills/hojyokin-research/SKILL.md` |
| 都道府県まとめ記事の執筆 | `.agents/skills/hojyokin-article/SKILL.md` |
| 自治体マスタ・公式URL参照（namagomi-techo） | `.agents/skills/hojyokin-namagomi-refs/SKILL.md` |

入口の一覧・更新ルール: [`.agents/README.md`](.agents/README.md)

## 技術（未定）

サイト本体のフレームワーク・パッケージマネージャは未選定。決まり次第、本セクションと `README.md` を更新する。

## よく使うコマンド

```bash
node scripts/sync-namagomi-refs.mjs   # namagomi-techo → refs 同期
```

## 外部参照ナレッジ（namagomi-techo）

自治体のスラッグ・名称・`.lg.jp` 公式URLの索引は [namagomi-techo](https://github.com/sasisi344/namagomi-techo) から同期する。

- ガイド: `.workspace/refs/namagomi-techo.md`
- 索引: `.workspace/refs/municipalities-index.json`（約1,000自治体）
- 都道府県マスタ: `.workspace/refs/pref-slugs.json`
- 同期: `node scripts/sync-namagomi-refs.mjs`

**注意**: 索引の `officialUrl` は生ごみ処理機補助金のページ。hojyokin-matome の制度事実としてそのまま流用せず、ドメイン・自治体正規化の参照に限定する。

## 作業上の注意

- `.workspace/` は設計メモ・調査素材用。アプリ本体のソースと混同しない
- 変更は依頼範囲に限定する（不要なリファクタや無関係ファイルの編集をしない）
- コミット・ブランチ操作は明示されたときのみ
- 画像生成は明示指示がない限り行わない
- 画像生成を行う場合は、ワークスペース共通ルールの指定スクリプトに従う

## 記事・調査の方針（たたき台）

以下は `.workspace/設計図.md` と `.workspace/research/README.md` に基づく初期方針。詳細ルールは `.cursor/rules/` および各 Skill に分離する。

- **記事単位**: 都道府県ごとに1記事（自治体別の個別記事は量産しない）
- **独自性**: 希少性・導入時期・利用者の声など、横断的な切り口を記事の価値にする
- **ソースの信頼度**: 公式（go.jp / 自治体）を事実の主軸とし、ブログ・SNSは感想セグメントに限定

## 未整備（TODO）

- [ ] サイト技術スタックの確定
- [ ] 記事テンプレート・フロントマター規約
- [ ] ビルド・チェック用 npm スクリプト
