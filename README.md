# 📚 Kindle書籍コレクション

Amazon Kindleで読んだ書籍を紹介するWebサイトです。書籍の表紙画像、ハイライト、カテゴリ別分類を用いて、読書記録を美しく整理・共有できます。

## ✨ 特徴

- 📖 **書籍カード表示**: 表紙画像、タイトル、著者、ハイライト数を表示
- 🔍 **検索・フィルター機能**: タイトル・著者名での検索、カテゴリ別フィルタリング
- 📊 **統計情報**: 総書籍数、ハイライト数、カテゴリ数の表示
- 💡 **ハイライト表示**: 各書籍の重要なハイライトを抜粋表示
- 🛒 **Amazon連携**: 直接Amazonの商品ページへリンク
- 📱 **レスポンシブデザイン**: モバイル・タブレット・デスクトップ対応

## 🛠️ 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **スタイリング**: Tailwind CSS
- **言語**: TypeScript
- **デプロイ**: Vercel
- **データ**: JSON形式で書籍情報を管理

## 📋 前提条件

このプロジェクトを使用するには、以下が必要です：

- **Obsidian**: Kindle書籍のハイライトを管理するために使用
- **Kindle Highlight Plugin**: ObsidianでKindle書籍のハイライトをMarkdown形式で取得するプラグイン

## 🚀 セットアップ

### 1. プロジェクトのクローン

```bash
git clone [your-repository-url]
cd kindle-book-showcase
```

### 2. 依存関係のインストール

```bash
npm install
```

### 3. Obsidian Kindle Highlightプラグインのセットアップ

#### 3-1. Obsidianの準備

1. [Obsidian](https://obsidian.md/)をインストール
2. 新しいVaultを作成、または既存のVaultを使用

#### 3-2. Kindle Highlightプラグインのインストール

1. Obsidianで「設定」→「コミュニティプラグイン」→「Browse」をクリック
2. 「Kindle Highlights」を検索してインストール
3. プラグインを有効化

#### 3-3. プラグインの設定

1. 「Kindle Highlights」の設定を開く
2. 以下を設定：
   - **Output folder**: `kindle` （重要：このフォルダ名を指定）
   - **Template**: 必要に応じてカスタマイズ
   - **Amazon region**: 日本の場合は「amazon.co.jp」

### 4. kindleフォルダの作成とデータ取得

#### 4-1. kindleフォルダの作成

プロジェクトルートに`kindle`フォルダを作成します：

```bash
mkdir kindle
```

#### 4-2. Kindle書籍のハイライトを取得

1. ObsidianでKindle Highlightプラグインを使用してハイライトを同期
2. 生成されたMarkdownファイルを`kindle/`フォルダにコピー

**重要**: extract-books.jsスクリプトは`kindle/`フォルダを参照するように設定されています。異なるパスを使用する場合は、`extract-books.js`の以下の部分を修正してください：

```javascript
// extract-books.js の修正例
const kindleDir = './kindle'; // パスを変更する場合はここを修正
```

### 5. 書籍データの抽出

```bash
npm run extract-books
```

### 6. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) にアクセスしてください。

## 📁 プロジェクト構造

```
kindle-book-showcase/
├── app/
│   ├── globals.css          # グローバルスタイル
│   ├── layout.tsx           # レイアウトコンポーネント
│   └── page.tsx            # メインページ
├── components/
│   └── BookCard.tsx        # 書籍カードコンポーネント
├── data/
│   └── books.json          # 書籍データ（自動生成）
├── kindle/                 # Kindle書籍Markdownファイル（要作成）
│   ├── book1.md
│   ├── book2.md
│   └── ...
├── extract-books.js        # 書籍データ抽出スクリプト
├── package.json
├── next.config.js
├── tailwind.config.js
└── vercel.json            # Vercelデプロイ設定
```

## 📚 書籍データの管理

### Obsidian Kindle Highlightプラグインでの書籍データ形式

プラグインが生成するMarkdownファイルは以下の形式になります：

```yaml
---
kindle-sync:
  bookId: '12345'
  title: '書籍タイトル'
  author: '著者名'
  asin: 'B01ABCDEFG'
  lastAnnotatedDate: '2025-01-01'
  bookImageUrl: 'https://m.media-amazon.com/images/I/sample.jpg'
  highlightsCount: 5
---

# 書籍タイトル

## ハイライト

> ここに重要なハイライトが表示されます
> - 注: 個人的なメモ

> 別のハイライト
```

### 新しい書籍の追加

1. **Obsidianで新しい書籍を同期**：
   - Kindle Highlightプラグインで「Sync your highlights」を実行
   - 新しい書籍のハイライトが自動的に取得されます

2. **ファイルのコピー**：
   - 生成されたMarkdownファイルを`kindle/`フォルダにコピー

3. **データの再抽出**：
   ```bash
   npm run extract-books
   ```

### カスタムカテゴリの設定

書籍にカテゴリを追加したい場合は、Markdownファイルのfrontmatterに追加：

```yaml
---
kindle-sync:
  # ... 既存の設定
category: 'マネジメント・リーダーシップ'  # カテゴリを追加
---
```

## 🔧 トラブルシューティング

### よくある問題

1. **kindleフォルダが見つからない**
   ```bash
   Error: ENOENT: no such file or directory, scandir './kindle'
   ```
   → `mkdir kindle` でフォルダを作成してください

2. **書籍データが表示されない**
   - `kindle/`フォルダにMarkdownファイルが存在するか確認
   - `npm run extract-books` を実行してデータを抽出
   - `data/books.json` が生成されているか確認

3. **画像が表示されない**
   - Amazon の画像URLが有効か確認
   - ネットワーク接続を確認

## 🌐 Vercelへのデプロイ

### 方法1: Vercel CLIを使用

```bash
# Vercel CLIのインストール
npm i -g vercel

# デプロイ
vercel --prod
```

### 方法2: GitHubとの連携

1. GitHubリポジトリにプッシュ
2. [Vercel](https://vercel.com)にログイン
3. 「New Project」からリポジトリを選択
4. 自動デプロイが開始されます

### 環境変数の設定

特に設定は不要ですが、必要に応じて以下を設定できます：

```bash
# Vercelで環境変数を設定
vercel env add NEXT_PUBLIC_SITE_URL production
```

## 🎨 カスタマイズ

### カテゴリの色を変更

`components/BookCard.tsx` の `categoryColors` オブジェクトを編集：

```typescript
const categoryColors: { [key: string]: string } = {
  'マネジメント・リーダーシップ': 'bg-blue-100 text-blue-800',
  '技術・エンジニア': 'bg-green-100 text-green-800',
  // 新しいカテゴリを追加
};
```

### スタイルのカスタマイズ

`tailwind.config.js` で色やフォントを変更：

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // カスタムカラーパレット
      }
    }
  }
}
```

## 📋 スクリプト

- `npm run dev` - 開発サーバー起動
- `npm run build` - 本番用ビルド
- `npm run start` - 本番サーバー起動
- `npm run lint` - ESLintチェック
- `npm run extract-books` - 書籍データ抽出

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。詳細は[LICENSE](LICENSE)ファイルを参照してください。

## 🔗 関連リンク

- [Next.js ドキュメント](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Vercel](https://vercel.com)

---

**注意**: このプロジェクトは個人的な読書記録を整理・共有する目的で作成されています。書籍の著作権は各著者・出版社に帰属します。

# Kindle書籍コレクション Playwright テスト

このプロジェクトは、ポート3000で動作するKindle書籍コレクションサイトのPlaywrightテストスイートです。

## 📋 プロジェクト概要

### テスト対象
- **URL**: http://localhost:3000
- **アプリケーション**: Kindle書籍コレクション
- **機能**: 89冊のビジネス・自己啓発書の検索・フィルタリング

### テストの種類
- **E2Eテスト**: エンドツーエンドの統合テスト
- **機能テスト**: 検索、フィルター、表示機能
- **レスポンシブテスト**: モバイル・タブレット・デスクトップ対応
- **パフォーマンステスト**: 読み込み速度・表示確認

## 🚀 セットアップ手順

### 1. 依存関係のインストール

```bash
# Node.jsの依存関係をインストール
npm install

# Playwrightブラウザをインストール
npm run install:playwright
```

### 2. テスト対象アプリケーションの起動

テストを実行する前に、localhost:3000でアプリケーションが起動していることを確認してください。

```bash
# 別のターミナルでアプリケーションを起動
cd /path/to/your/kindle-app
npm start
# または
npm run dev
```

## 🧪 テスト実行方法

### 基本テスト実行

```bash
# 全テストを実行
npm test

# ヘッドレスモードで実行（デフォルト）
npx playwright test

# GUIモードで実行（ブラウザ表示）
npm run test:headed

# デバッグモードで実行
npm run test:debug
```

### テストUI使用

```bash
# Playwright Test UIを起動
npm run test:ui
```

### テストレポート表示

```bash
# HTMLレポートを表示
npm run test:report
```

## 📁 ファイル構成

```
├── kindle-collection-e2e-test.js    # メインテストスイート
├── package.json                     # プロジェクト設定
├── playwright.config.js             # Playwright設定
├── test-execution-report.md         # 実行結果レポート
└── README.md                        # このファイル
```

## 🎯 テストケース一覧

### 1. 基本表示機能テスト
- ページタイトル確認
- ヘッダー情報確認
- 統計情報表示確認

### 2. 検索機能テスト
- テキスト検索（"マネジメント"）
- 検索結果確認
- 検索クリア機能

### 3. カテゴリフィルター機能テスト
- カテゴリ選択機能
- フィルター結果確認
- 全カテゴリ表示復帰

### 4. 複合フィルター機能テスト
- 検索 + カテゴリフィルター
- フィルターリセット機能
- 条件クリア確認

### 5. 書籍カード表示テスト
- 書籍詳細情報表示
- Amazonリンク確認
- 画像表示確認

### 6. ハイライト表示テスト
- ハイライト一覧表示
- コピー機能確認
- 表示切り替え確認

### 7. レスポンシブ表示テスト
- デスクトップ表示（1200x800）
- タブレット表示（768x1024）
- モバイル表示（375x667）

### 8. フッター表示テスト
- フッター情報確認
- 説明文表示確認

## 🛠️ 設定詳細

### 対応ブラウザ
- **Chromium** (Google Chrome)
- **Firefox**
- **WebKit** (Safari)
- **Mobile Chrome** (モバイル表示)

### レポート出力
- **HTML形式**: 詳細なビジュアルレポート
- **JSON形式**: `test-results.json`
- **JUnit形式**: `test-results.xml`

### スクリーンショット・録画
- **失敗時のスクリーンショット**: 自動保存
- **失敗時の動画録画**: 自動保存
- **トレース機能**: リトライ時に有効

## 🔧 カスタマイズ

### テストタイムアウト設定
`playwright.config.js`でタイムアウト時間を調整できます：

```javascript
use: {
  actionTimeout: 10000,        // 要素操作のタイムアウト
  navigationTimeout: 30000,    // ナビゲーションタイムアウト
}
```

### 並列実行設定
```javascript
workers: process.env.CI ? 1 : undefined,  // CI環境では1、ローカルでは自動
```

## 📊 テスト結果の確認

### 成功時の出力例
```
✓ ページの基本構造と統計情報が正しく表示される
✓ 検索機能が正常に動作する
✓ カテゴリ選択機能が正常に動作する
✓ 複合フィルター機能が正常に動作する
✓ 書籍カード詳細情報が正しく表示される
✓ ハイライト表示機能が正常に動作する
✓ レスポンシブ表示が正常に動作する
✓ フッター情報が正しく表示される

8 passed (30s)
```

## ⚠️ トラブルシューティング

### よくある問題と解決方法

#### 1. テスト対象アプリケーションが起動していない
```
Error: connect ECONNREFUSED 127.0.0.1:3000
```
**解決方法**: localhost:3000でアプリケーションを起動してください

#### 2. ブラウザがインストールされていない
```
Error: Executable doesn't exist at /path/to/browser
```
**解決方法**: `npm run install:playwright`を実行してください

#### 3. タイムアウトエラー
```
Error: Test timeout of 30000ms exceeded
```
**解決方法**: `playwright.config.js`でタイムアウト時間を延長してください

## 📝 追加情報

### Playwright MCP サーバーとの比較
このテストは従来のPlaywrightテストコードですが、Playwright MCPサーバーを使用することで以下の利点があります：

- **対話的テスト**: リアルタイムでテスト実行
- **アクセシビリティベース**: 高速で正確な要素特定
- **ビジュアル確認**: スクリーンショット取得
- **デバッグ容易**: ステップバイステップ実行

### 関連ファイル
- `test-execution-report.md`: Playwright MCPサーバーでのテスト実行結果
- `playwright-mcp-test-results.md`: 以前のMCPテスト結果

## 🤝 貢献

テストの改善や追加のテストケースがある場合は、以下の手順で貢献してください：

1. テストケースを追加
2. `npm test`でテスト実行
3. レポートを更新
4. プルリクエストを作成

## �� ライセンス

MIT License 