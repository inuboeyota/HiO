# HiO - Holistic Infrastructure Orchestrator

↓GeminiCLIに書かせました！GeminiCLI最高！GeminiCLI最高！GeminiCLI最高！GeminiCLI最高！GeminiCLI最高！GeminiCLI最高！

## 概要

HiO (Holistic Infrastructure Orchestrator) は、TypeScriptで構築された汎用的なDiscordボットの基盤です。
Prisma ORMとSQLiteデータベースを採用しており、拡張性の高いコマンドシステムとイベントハンドリング機構を備えています。

## 主な特徴

- **TypeScriptベース**: 静的型付けによる安全で堅牢な開発が可能です。
- **discord.js v14**: 最新のDiscord APIに対応しています。
- **Prisma ORM**: 型安全なデータベースアクセス（SQLite）を実現します。
- **モジュール化設計**: コマンド、イベント、トリガーなどがモジュールとして整理されており、機能の追加や変更が容易です。
- **環境分離**: 開発 (development) 環境と本番 (production) 環境の設定を分離できます。

## 必要なもの

- [Node.js](https://nodejs.org/) (v18以上を推奨)
- [pnpm](https://pnpm.io/ja/) (または npm, yarn)

## インストールとセットアップ

1. リポジトリをクローンします。

    ```bash
    git clone https://github.com/yotawokuuinu/HiO.git
    cd HiO
    ```

2. 依存パッケージをインストールします。

    ```bash
    pnpm install
    ```

3. `.env`ファイルを作成し、環境変数を設定します。

    ```
    DISCORD_BOT_TOKEN=YOUR_DISCORD_BOT_TOKEN
    ```

4. Prismaのマイグレーションを実行して、データベースをセットアップします。

    ```bash
    npx prisma migrate dev
    ```

## 使い方

### 開発環境

ファイル変更を監視し、自動で再起動します。

```bash
pnpm run dev-watcher
```

### 本番環境

ビルドしてからボットを起動します。

```bash
pnpm run prd-deploy
```

## ディレクトリ構成

```
.
├── prisma/              # Prismaスキーマとマイグレーション
│   └── schema.prisma
├── src/                 # ソースコード
│   ├── bot.ts           # Discordクライアントの初期化
│   ├── main.ts          # アプリケーションのエントリーポイント
│   ├── core/            # ボットの中核機能
│   ├── events/          # Discordイベントハンドラ
│   ├── msgTrigger/      # メッセージベースのコマンド
│   └── types/           # 型定義
├── package.json         # プロジェクト情報と依存関係
└── tsconfig.json        # TypeScriptコンパイラ設定
```

## ライセンス

このプロジェクトは [MIT License](LICENSE) の下で公開されています。
