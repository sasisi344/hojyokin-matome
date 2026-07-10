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

## ディレクトリ構成

```
hojyokin-matome/
├── README.md                 # 本ファイル（プロジェクトの入口）
├── CLAUDE.md                 # Claude / Cursor 向けの基本ルール
├── .cursor/
│   └── skills/               # タスク別 Skill（調査・記事など）
└── .workspace/               # 設計メモ・リサーチ用（アプリ本体とは分離）
    ├── 設計図.md
    ├── 補助金ネタ.md
    └── research/             # DeepResearch 用プロンプト・出力先
        ├── README.md
        ├── prompts/
        └── output/
```

サイト本体（Astro 等）のソースは、技術選定後にルート直下へ追加する想定です。

## AI 運用（Cursor + Claude）

このプロジェクトは **Cursor** と **Claude** を併用して運用します。ルールはこれから詰めていきますが、現時点の参照順は次のとおりです。

1. 本リポジトリの `CLAUDE.md` および `.cursor/skills/`
2. 親ワークスペース: `C:\Users\sasis\344dev\CLAUDE.md`
3. ユーザー設定: `~/.claude/settings.json`

### Skill 一覧（初期）

| Skill | 用途 |
|-------|------|
| [hojyokin-research](.cursor/skills/hojyokin-research/SKILL.md) | 補助金の DeepResearch・制度調査 |
| [hojyokin-article](.cursor/skills/hojyokin-article/SKILL.md) | 都道府県まとめ記事の執筆・更新 |

各 Skill はプレーンなひな型です。運用が固まり次第、本文を追記してください。

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
