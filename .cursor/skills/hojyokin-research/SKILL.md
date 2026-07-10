---
name: hojyokin-research
description: ニッチ補助金の DeepResearch・制度調査の手順を標準化する。防犯グッズ・宅配ボックス等のテーマ調査、公式ソースの裏取り、希少性判定、出力フォルダへのレポート化が必要なときに使う。
---

# Hojyokin Research Skill

## 目的

- 補助金テーマごとに **1セッション = 1テーマ** で調査する
- 公式ソースを軸に事実を整理し、利用者の声は別セグメントに分離する
- 成果物を `.workspace/research/output/{テーマ}/` に揃える

## 正本

- 調査設計・出力形式・信頼度ルール: `.workspace/research/README.md`
- テーマ別プロンプト: `.workspace/research/prompts/`
- ネタ・候補テーマ: `.workspace/補助金ネタ.md`
- 自治体名・`.lg.jp` ドメインのたたき台: `.workspace/refs/municipalities-index.json`（Skill: `hojyokin-namagomi-refs`）

## 実行フロー（たたき台）

1. 対象テーマのプロンプト（`prompts/01-*.md` 等）を確認する
2. DeepResearch に投入し、**1テーマずつ** 実行する（混在させない）
3. 出力を `output/{テーマ}/` の所定ファイル名で配置する
4. 品質チェックリスト（`.workspace/research/README.md` 末尾）で提出前確認する

## 出力フォルダ（各テーマ共通）

```
output/{テーマ}/
├── 00-executive-summary.md
├── 01-subsidy-inventory.md
├── 02-rarity-analysis.md
├── 03-introduction-timeline.md
├── 04-user-voice.md
└── sources/
    ├── official-urls.md
    ├── secondary-urls.md
    └── rejected-urls.md
```

## 信頼度（要約）

| ランク | 用途 |
|--------|------|
| A（go.jp / 自治体など） | 金額・期限・要件などの**事実** |
| B（co.jp 等） | 制度リスト・申請フロー補足。**Aと矛盾したらA** |
| C（ブログ・SNS等） | **利用者の感想のみ** |

## 未整備（TODO）

- [ ] テーマ追加時のプロンプト命名規則
- [ ] 横断比較（`03-cross-compare.md`）の実行基準
- [ ] 調査結果から記事下書きへの引き渡し手順
