# Turborepo starter

This is an official starter Turborepo.

## Micro frontends with SSR Example

`apps/mfe1`: **Vite** based React Micro frontend
`apps/web`: **Next JS** based host app

### Steps

- **MFE**: Custom vite server has two endpoints: `/ssr`: SSR micro app, `/mfe1.js`: CSR ES module for hydration
- **Importmaps**: Use importmaps to share dependencies and es modules at run time inside browser
- **NextJS**: Default next js app with React server components, renders MFE on server first followed by hydration on client side

### Run demo

To build all apps and packages, start the server:

```
pnpm start
```
