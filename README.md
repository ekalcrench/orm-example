This is a [Next.js](https://nextjs.org) project with prisma implmentation.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Prisma Circumtances

1. Open MongoDB Atlas for cloud database
2. Download MongoDB Compass to connect into MongoDB Atlas for better UI Interface
3. Create .env file that has DATABASE_URL=<connections/database_name>, you can see it in MongoDB Atlas for connections
4. Download @prisma/client
5. Create all model in schema.prisma file to make it easy, you can download prisma extension from VS Code
6. Run using this command "npx prisma generate" to generate all the prisma model that has been created in schema.prisma file
7. Run "npx prisma db push" if you have @unique fields in your model, so your database has a guard to has a unique value
