# hojyokin-matome（補助金まとめ）

## 概要

ニッチな補助金・助成金を調査し、都道府県単位でまとめた記事として提供するプロジェクト。自治体ごとの量産記事ではなく、**都道府県1記事**と**独自性**を重視する（詳細は `.workspace/設計図.md`）。

## 優先順位

本リポジトリは **344dev ルートから独立**して運用する。

1. 本リポジトリの `CLAUDE.md` および `.cursor/skills/`
2. ユーザー: `~/.claude/settings.json`
3. （ローカルで 344dev モノレポ内に置いている場合のみ参考）`C:\Users\sasis\344dev\CLAUDE.md`

## 技術（未定）

サイト本体のフレームワーク・パッケージマネージャは未選定。決まり次第、本セクションと `README.md` を更新する。

## よく使うコマンド

（サイト構築後に追記）

## Skill への導線

| 作業 | Skill |
|------|-------|
| 補助金の調査・DeepResearch | `.cursor/skills/hojyokin-research/SKILL.md` |
| 都道府県まとめ記事の執筆 | `.cursor/skills/hojyokin-article/SKILL.md` |
| 自治体マスタ・公式URL参照（namagomi-techo） | `.cursor/skills/hojyokin-namagomi-refs/SKILL.md` |

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

以下は `.workspace/設計図.md` と `.workspace/research/README.md` に基づく初期方針。詳細ルールは今後 `.cursor/rules/` や各 Skill に分離する。

- **記事単位**: 都道府県ごとに1記事（自治体別の個別記事は量産しない）
- **独自性**: 希少性・導入時期・利用者の声など、横断的な切り口を記事の価値にする
- **ソースの信頼度**: 公式（go.jp / 自治体）を事実の主軸とし、ブログ・SNSは感想セグメントに限定

## 未整備（TODO）

- [ ] サイト技術スタックの確定
- [ ] `.cursor/rules/` の追加
- [ ] 記事テンプレート・フロントマター規約
- [ ] ビルド・チェック用 npm スクリプト
