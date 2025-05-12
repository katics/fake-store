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

## Testing

This project includes a comprehensive testing setup using Jest and React Testing Library:

### Running Tests

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

### Test Coverage

The tests cover various aspects of the application:

- **Utility Functions**: Basic unit tests for formatting functions
- **UI Components**:
  - `ErrorDisplay`: Tests for rendering messages and conditional button display
  - `ProductCard`: Tests for product rendering, loading states, and cart interactions
  - `MobileMenu`: Tests for conditional rendering and user interactions

### Testing Stack

- Jest: Test runner and assertion library
- React Testing Library: DOM testing utilities
- User Event: Simulating user interactions

### Test Organization

Tests are organized in `__tests__` directories alongside the components they test, making it easy to maintain and update tests when components change.
