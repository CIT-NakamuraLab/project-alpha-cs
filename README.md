# Project-Alpha-CS（仮）
入退出鍵管理アプリ（コントロールサーバ）

## Development
このプロジェクトではSlack OAuthを利用している都合上、開発サーバもhttpsに対応させる必要があります。  
よって、Next.jsのカスタムサーバ機能を利用します。

### 開発サーバの設定

#### 自己署名証明書を生成
```bash
openssl req -x509 -out localhost.crt -keyout localhost.key \
  -newkey rsa:2048 -nodes -sha256 \
  -subj "/CN=localhost" -extensions EXT -config <( \
   printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
```
生成された`localhost.key`と`localhost.crt`を`/certificates/`以下に配置

#### 依存パッケージをインストール
```bash
$ yarn
```

#### .envを用意する
`.env.sample`をコピーして`.env`を生成、環境変数を設定する

#### データベースを起動
```bash
$ docker-compose up -d
```

#### データベースのマイグレーションを実施
```bash
$ yarn migration:generate
$ yarn migration:dev
```

#### 開発サーバを起動
```bash
$ yarn run dev:ssl
```
