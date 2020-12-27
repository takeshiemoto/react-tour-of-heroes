# Tour Of Heroes Workspace

Nx x Next.jsのサンプルコード

## 事前準備

- [APIの環境構築](https://github.com/takeshiemoto/tour-of-heroes-api)
- [Vercelアカウント](https://vercel.com/)
- [Vercel CLI](https://vercel.com/download)
- このリポジトリを任意のリポジトリにforkする （Cloneしてリモート変更でも可能）

## Vercel

**ImportProject**からGithubのコードを読み込むと自動でデプロイされます。この時点では何も設定していないのでデプロイ失敗するので、下記の通り設定を行った後、**Redeploy**を行ってください。

### Build & Development Settings

Build Command

```
npx nx build tour-of-heroes
```

Output Directory

```
dist/apps/tour-of-heroes/.next
```

### Environment Variables

DEV_API_URL

```
http://localhost:5000
```

API_URL

```
<HerokuのURL>
```
