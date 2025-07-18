
# プロジェクト概要

このプロジェクトは、`discord.js` を使用して構築されたDiscordボットです。
主な機能は、ユーザーが送信したメッセージに基づいて特定のコマンドを実行することです。

## 主要技術スタック

- **言語:** TypeScript
- **フレームワーク:** Node.js
- **主要ライブラリ:**
  - `discord.js`: Discord APIとの連携
  - `dotenv`: 環境変数の管理
  - `glob`: ファイルパスのパターンマッチングによる動的なコマンド読み込み

## アーキテクチャ

本プロジェクトは、イベント駆動型のアーキテクチャを採用しており、特にDiscordからのメッセージイベントをトリガーとして動作します。

### 1. 起動シーケンス (`main.ts`)

1. **環境設定:** `dotenv` を使用して、実行環境（`production`, `development`など）に応じた `.env` ファイルを読み込みます。
2. **コマンド読み込み:** `messageCommandLoader` および `messageCommandCrawler` が `src/msgTrigger/commands` ディレクトリ配下のコマンド定義ファイルを動的にインポートし、実行可能なコマンドのリストを生成します。
3. **Discordクライアント初期化:** `bot.ts` で設定された `Client` インスタンスを生成します。
4. **イベントリスナー登録:**
    - `ready`: ボットの起動が完了した際に一度だけ実行されます。コンソールへのログ出力と、環境変数 `ADMIN_USER` で指定された管理者へのDM通知を行います。
    - `messageCreate`: ユーザーがメッセージを送信するたびに実行されます。後述のコマンド処理フローへ処理を委譲します。
5. **ログイン:** 環境変数 `TOKEN` を使用してDiscordにログインします。

### 2. コマンド処理フロー

1. **イベント受信 (`main.ts`):** `messageCreate` イベントリスナーが、ボット自身が送信したメッセージでないことを確認した上で、受信した `message` オブジェクトを `messageCommandFactory` に渡します。
2. **コマンド特定 (`core/messageCommand/messageCommandFactory.ts`):**
    - メッセージ本文からコマンド名（プレフィックスを除いた最初の単語）を抽出します。
    - 起動時に読み込まれたコマンドリスト内に、該当するコマンド名が存在するか検索します。
3. **コマンド実行:**
    - 該当するコマンドが見つかった場合、そのコマンドオブジェクトの `execute` メソッドを実行します。
    - コマンドが見つからない場合は、何も処理を行いません。

### 3. コマンド定義

- **場所:** `src/msgTrigger/commands/` ディレクトリ
- **形式:** 各コマンドは個別のTypeScriptファイルとして定義されます。
- **インターフェース (`types/command.ts`):** すべてのコマンドは、以下のプロパティを持つ `MessageCommand` インターフェースを実装する必要があります。
  - `name` (string): コマンド名
  - `description` (string): コマンドの説明
  - `execute` (function): コマンドの本体ロジック。`Message` オブジェクトを引数に取ります。

### 4. 権限管理 (`core/permissions.ts`)

- 特定のコマンド（例: `joto`）の実行権限を制御するためのロジックが実装されています。
- `isAdmin` 関数は、メッセージ送信者のユーザーIDが環境変数 `ADMIN_USER` と一致するかどうかを判定し、管理者権限をチェックします。

## ディレクトリ構成の概要

```
src/
├── bot.ts                  # Discordクライアントのインスタンス生成と設定
├── main.ts                 # アプリケーションのエントリーポイント、イベントハンドリング
├── core/                   # 中核的な機能
│   ├── messageCommand/     # メッセージコマンドの処理ロジック
│   │   ├── messageCommandCrawler.ts  # コマンドの動的読み込み
│   │   ├── messageCommandFactory.ts  # コマンドの実行
│   │   └── messageCommandLoader.ts   # コマンドの動的読み込み
│   └── permissions.ts      # 権限チェックロジック
├── msgTrigger/             # メッセージをトリガーとする機能
│   └── commands/           # コマンド定義ファイル群
│       ├── joto.ts
│       └── ping.ts
└── types/                  # 型定義
    └── command.ts          # コマンドのインターフェース定義
```

## 補足

- `messageCommandLoader.ts` と `messageCommandCrawler.ts` は、現時点でほぼ同一の機能を持っています。これは将来的な拡張やリファクタリングの過程で分離される可能性があります。
