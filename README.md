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