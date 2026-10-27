# エージェント共通ナレッジ（Cursor / Claude Code）

本ディレクトリは **Cursor** と **Claude Code** の両方が参照する Skill の**正本**です。

## 優先順位（両ツール共通）

1. ルート [`CLAUDE.md`](../CLAUDE.md)
2. [`.cursor/rules/`](../.cursor/rules/)（Cursor は自動適用、Claude は本書・`CLAUDE.md` から同等ルールを参照）
3. **`.agents/skills/`** — Skill 正本（本ディレクトリ）
4. 各ツールの入口（正本へ誘導する薄いラッパー）
   - Cursor: [`.cursor/skills/`](../.cursor/skills/)
   - Claude Code: [`.claude/skills/`](../.claude/skills/)
5. ユーザー設定: `~/.claude/settings.json`

## Skill 一覧

| Skill | 正本 | 用途 |
|-------|------|------|
| `hojyokin-research` | [skills/hojyokin-research/SKILL.md](skills/hojyokin-research/SKILL.md) | 補助金の DeepResearch・制度調査 |
| `hojyokin-article` | [skills/hojyokin-article/SKILL.md](skills/hojyokin-article/SKILL.md) | 都道府県まとめ記事の執筆・更新 |
| `hojyokin-namagomi-refs` | [skills/hojyokin-namagomi-refs/SKILL.md](skills/hojyokin-namagomi-refs/SKILL.md) | namagomi-techo の自治体・公式URL参照 |

## 運用ルール

- Skill の内容を更新するときは **`.agents/skills/` のみ**を編集する（`.cursor/skills/` / `.claude/skills/` は入口のため変更不要）
- 新規 Skill 追加時は正本を `.agents/skills/` に置き、両入口に同名ラッパーを追加する
- プロジェクト全体のルール変更は `CLAUDE.md` と `.cursor/rules/` を同期する
