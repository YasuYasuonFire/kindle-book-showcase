# テストフォルダ構成

## 📁 フォルダ構造

```
test/
├── README.md                          # このファイル
├── kindle-collection-test.js           # 基本テストファイル
├── kindle-collection-e2e-test.js       # E2Eテストスイート
├── search-100-words.spec.js           # 100種類検索単語テスト
├── search-test-100-words.js           # 検索単語シミュレーション
├── playwright-mcp-test-results.md      # MCPサーバーテスト結果
├── test-execution-report.md            # テスト実行レポート
├── test-results-summary.md             # 100単語テスト結果サマリー
├── search-test-results.json           # JSON形式テスト結果
├── test-results.json                   # Playwrightテスト結果
├── test-results.xml                    # XML形式テスト結果
├── playwright-report/                  # PlaywrightのHTMLレポート
└── test-results/                       # 詳細なテスト結果とスクリーンショット
```

## 🧪 テストファイル説明

### 1. 基本テストファイル
- **`kindle-collection-test.js`**: 基本的なPlaywrightテストコード
- **`kindle-collection-e2e-test.js`**: 包括的なE2Eテストスイート（8つのテストケース）

### 2. 検索機能テスト
- **`search-100-words.spec.js`**: 100種類の検索単語を使った実際のブラウザテスト
- **`search-test-100-words.js`**: 検索単語のシミュレーションスクリプト

### 3. テスト結果・レポート
- **`playwright-mcp-test-results.md`**: Playwright MCPサーバーを使ったテスト結果
- **`test-execution-report.md`**: E2Eテストの詳細実行レポート
- **`test-results-summary.md`**: 100単語検索テストの結果サマリー

### 4. 結果ファイル
- **`*.json`**: 構造化されたテスト結果データ
- **`*.xml`**: CI/CD用のテスト結果形式
- **`playwright-report/`**: ブラウザで表示可能なHTMLレポート
- **`test-results/`**: スクリーンショット、動画、エラーコンテキスト

## 🚀 テスト実行方法

### 1. E2Eテストスイート実行
```bash
npx playwright test kindle-collection-e2e-test.js
```

### 2. 100単語検索テスト実行
```bash
npx playwright test search-100-words.spec.js
```

### 3. 全テスト実行
```bash
npx playwright test
```

### 4. HTMLレポート表示
```bash
npx playwright show-report
```

## 📊 テスト対象機能

- ✅ ページ読み込みと基本構造
- ✅ 書籍検索機能
- ✅ カテゴリフィルター
- ✅ 複合フィルター（検索 + カテゴリ）
- ✅ フィルターリセット機能
- ✅ 書籍カード表示
- ✅ ハイライト表示機能
- ✅ レスポンシブデザイン
- ✅ パフォーマンス（読み込み時間）

## 🔧 設定ファイル

設定は親ディレクトリの `playwright.config.js` で管理されています：
- テストディレクトリ: `./test`
- 対象ブラウザ: Chrome, Firefox, Safari, Mobile Chrome, Mobile Safari
- ベースURL: `http://localhost:3000`
- レポート形式: HTML

## 📈 テスト結果の確認

1. **コンソール出力**: 基本的な成功/失敗情報
2. **HTMLレポート**: `playwright-report/index.html`
3. **詳細結果**: `test-results/` フォルダ内のスクリーンショット・動画
4. **Markdownレポート**: `*.md` ファイルで人間が読みやすい形式 