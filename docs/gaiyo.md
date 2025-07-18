
# 概要仕様書

## 1. はじめに

このドキュメントは、`HiO`プロジェクトのソースコードの概要を説明し、新規参画者がプロジェクトの全体像を理解することを目的としています。

## 2. プロジェクトの目的

このプロジェクトは、Discordボットを開発・運用するためのものです。特定のメッセージ（プレフィックス付きコマンド）に反応して、様々なアクションを実行します。

## 3. 主要な技術スタック

- **言語:** TypeScript
- **フレームワーク:** Node.js
- **ライブラリ:**
  - discord.js: Discord APIと連携するための主要ライブラリ
  - dotenv: 環境変数を管理するためのライブラリ

## 4. ディレクトリ構成とファイル概要

### 4.1. `src/`

ソースコードのルートディレクトリです。

- **`main.ts`**:
  - プロジェクトのエントリーポイントです。
  - `dotenv` を使用して環境変数を読み込みます。
  - Discordクライアント (`botClient`) を初期化し、Discordにログインします。
  - `ready` イベントと `messageCreate` イベントのリスナーを設定します。
- **`bot.ts`**:
  - `discord.js` の `Client` をインスタンス化し、必要な `GatewayIntentBits` と `Partials` を設定します。
  - このクライアントインスタンス (`botClient`) は `main.ts` で使用されます。

### 4.2. `src/core/`

ボットの中核となる機能を実装するディレクトリです。

- **`permissions.ts`**:
  - （現在は空ですが）コマンドの実行権限などを管理するためのモジュールです。

#### 4.2.1. `src/core/messageCommand/`

メッセージコマンド（例: `!ping`）の処理に関連するモジュール群です。

- **`messageCommandLoader.ts`**:
  - `src/msgTrigger/commands/` ディレクトリ内のコマンドファイルを動的に読み込みます。
  - 各コマンドのプレフィックスとクラス名のペア (`TriggerClassPair`) を生成して返します。これにより、どのプレフィックスがどのコマンドに対応するかをマッピングします。
- **`messageCommandCrawler.ts`**:
  - `src/msgTrigger/commands/` ディレクトリ内のコマンドファイルを動的に読み込み、各コマンドクラスのインスタンスを生成します。
  - クラス名とインスタンスのペア (`ClassNameToInstancePair`) を生成して返します。
- **`messageCommandFactory.ts`**:
  - `messageCreate` イベントが発生した際に呼び出されます。
  - 受信したメッセージのプレフィックスを基に、`messageCommandLoader` と `messageCommandCrawler` から受け取った情報を使って、実行すべきコマンドを特定し、その `execute` メソッドを呼び出します。

### 4.3. `src/msgTrigger/`

メッセージによってトリガーされる具体的な処理を定義するディレクトリです。

#### 4.3.1. `src/msgTrigger/commands/`

個別のメッセージコマンドを定義するファイル群です。

- **`ping.ts`**:
  - `!ping` というプレフィックスに反応するコマンドです。
  - 実行されると "pong!" と返信します。
- **`joto.ts`**:
  - `!joto` というプレフィックスに反応するコマンドです。
  - 実行されると「いやああああああああああああああああああああああああああああああああ」と返信します。

### 4.4. `src/types/`

プロジェクト全体で使用される型定義をまとめるディレクトリです。

- **`command.ts`**:
  - `MessageCommand` や `SlashCommand` のインターフェースを定義しています。
  - `TriggerClassPair` や `ClassNameToInstancePair` など、コマンド処理で使われるカスタム型もここで定義されています。

## 5. 処理フロー

1. **起動 (`main.ts`)**:
    1. 環境変数を読み込みます。
    2. `messageCommandLoader` と `messageCommandCrawler` を実行し、利用可能なすべてのメッセージコマンドを事前に読み込んでおきます。
    3. `botClient` がDiscordにログインします。
    4. 起動が完了すると、コンソールに "READY" メッセージを表示し、管理者（`ADMIN_USER`）にDMで起動通知を送信します。

2. **メッセージ受信 (`main.ts` -> `messageCommandFactory.ts`)**:
    1. ユーザーからのメッセージを `messageCreate` イベントで受信します。
    2. ボット自身のメッセージは無視します。
    3. `messageCommandFactory` を呼び出します。
    4. `messageCommandFactory` は、メッセージのプレフィックスを抽出し、`msgLoadedCommands` (`TriggerClassPair`) を使って対応するクラス名を特定します。
    5. 特定したクラス名をキーとして、`msgCrawledCommands` (`ClassNameToInstancePair`) からコマンドのインスタンスを取得します。
    6. 取得したインスタンスの `execute` メソッドを実行し、コマンド固有の処理（例: `ping.ts` の `pingCmd`）を呼び出します。

## 6. コマンドの追加方法

新しいメッセージコマンドを追加するには、以下の手順に従います。

1. `src/msgTrigger/commands/` ディレクトリに、新しいコマンドファイル（例: `newCommand.ts`）を作成します。
2. 作成したファイル内で、`MessageCommand` インターフェースを実装したクラスを `export default` します。
3. クラスには `name`（クラス名と同じ）、`prefix`（トリガーとなる文字列）、`execute`（実行する関数）の3つのプロパティを必ず含めます。
4. `execute` 関数には、`Message` オブジェクトを引数として受け取り、コマンドの処理を実装します。

これだけで、ボットの起動時に新しいコマンドが自動的に読み込まれ、利用可能になります。
