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

### 3. 書籍データの抽出

```bash
npm run extract-books
```

### 4. 開発サーバーの起動

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
├── extract-books.js        # 書籍データ抽出スクリプト
├── package.json
├── next.config.js
├── tailwind.config.js
└── vercel.json            # Vercelデプロイ設定
```

## 📚 書籍データの追加

1. `kindle/` フォルダに新しい書籍のMarkdownファイルを追加
2. 以下の形式でメタデータを記述：

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
```

3. 書籍データを再抽出：

```bash
npm run extract-books
```

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