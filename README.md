# Fake Store

A modern e-commerce store built with Next.js, React Query, and TypeScript.

## Data Fetching Strategy

This project uses React Query for all data fetching operations with a simplified approach:

- Direct use of the native `fetch` API within React Query hooks
- Centralized API URL management through an API object
- Standardized error handling in each query function

### React Query Hooks

We've defined several custom hooks for data fetching that all follow the same pattern:

- `useCategories`: Fetches product categories
- `useProducts`: Fetches all products
- `useProductsByCategory`: Fetches products for a specific category
- `useProduct`: Fetches a single product by ID

Each hook handles its own data fetching logic while React Query takes care of:

- Caching
- Retrying failed requests
- Tracking loading and error states
- Deduplication of requests

## Architecture

The app follows Next.js 13+ App Router conventions with Client and Server Components:

- Server Components (`layout.tsx` files): Handle metadata generation
- Client Components: Use React Query for data fetching with built-in loading/error states

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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
