# hojyokin-matome（補助金まとめ）

ニッチな補助金・助成金を調査し、都道府県単位でまとめた記事として公開するプロジェクトです。生ごみ手帖（namagomi-techo）で得た知見を活かしつつ、**独自性**と**AdSense 向けの記事設計**を重視します。

## 目的

- 全国でも珍しい・話題になりやすい補助金を発掘する
- 都道府県ごとに1記事でまとめ、自治体別の量産記事によるスパム判定リスクを避ける
- 公式ソースを軸にした信頼できる制度情報と、利用者の声を分離して整理する

## 想定ユーザー

- 防犯グッズ・宅配ボックスなど特定品目の補助を探している個人
- ニッチ制度の有無や希少性を比較したい読者
- 制度の導入時期や申請の実感を知りたい方

## リポジトリ方針

- **GitHub**: https://github.com/sasisi344/hojyokin-matome
- **344dev ルートから独立**した単独リポジトリとして運用（モノレポのサブフォルダではない）
- 兄弟サイト [namagomi-techo](https://github.com/sasisi344/namagomi-techo) の自治体・公式URL索引を参照ナレッジとして同期可能

## ディレクトリ構成

```
hojyokin-matome/
├── README.md                 # 本ファイル（プロジェクトの入口）
├── CLAUDE.md                 # Claude / Cursor 向けの基本ルール
├── scripts/
│   └── sync-namagomi-refs.mjs  # namagomi-techo → refs 同期
├── .cursor/
│   └── skills/               # タスク別 Skill（調査・記事など）
└── .workspace/               # 設計メモ・リサーチ用（アプリ本体とは分離）
    ├── 設計図.md
    ├── 補助金ネタ.md
    ├── refs/                 # 外部リポジトリ由来の参照ナレッジ
    │   ├── municipalities-index.json
    │   └── pref-slugs.json
    └── research/             # DeepResearch 用プロンプト・出力先
        ├── README.md
        ├── prompts/
        └── output/
```

サイト本体（Astro 等）のソースは、技術選定後にルート直下へ追加する想定です。

## AI 運用（Cursor + Claude）

このプロジェクトは **Cursor** と **Claude** を併用して運用します。

1. 本リポジトリの `CLAUDE.md` および `.cursor/skills/`
2. ユーザー設定: `~/.claude/settings.json`

### Skill 一覧

| Skill | 用途 |
|-------|------|
| [hojyokin-research](.cursor/skills/hojyokin-research/SKILL.md) | 補助金の DeepResearch・制度調査 |
| [hojyokin-article](.cursor/skills/hojyokin-article/SKILL.md) | 都道府県まとめ記事の執筆・更新 |
| [hojyokin-namagomi-refs](.cursor/skills/hojyokin-namagomi-refs/SKILL.md) | namagomi-techo の自治体・公式URL参照 |

### namagomi-techo 参照ナレッジ

自治体名・スラッグ・公式 `.lg.jp` URL の索引を同期できます。

```bash
node scripts/sync-namagomi-refs.mjs
```

詳細: [.workspace/refs/README.md](.workspace/refs/README.md)

## 参考ドキュメント

| ファイル | 内容 |
|----------|------|
| [.workspace/設計図.md](.workspace/設計図.md) | サイト設計の方針（都道府県1記事・独自性など） |
| [.workspace/補助金ネタ.md](.workspace/補助金ネタ.md) | 調査テーマのメモ |
| [.workspace/research/README.md](.workspace/research/README.md) | DeepResearch の出力形式・信頼度ルール |

## 調査テーマ（初期）

- 防犯グッズ（防犯カメラ、防犯砂利など）
- 宅配ボックス

## ライセンス

未定（`LICENSE` は後日追加予定）。

## 貢献

Issue・Pull Request 歓迎です。公式出典 URL や制度改正の情報共有にご協力いただけると助かります。
