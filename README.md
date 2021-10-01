# Installing dependencies

```bash
yarn add prisma -D
yarn add pg @prisma/client
```


# Configuring

Make sure these configuration are on your `tsconfig.json`
```json
{
  "compilerOptions": {
    "sourceMap": true,
    "outDir": "dist",
    "strict": true,
    "lib": ["esnext"],
    "esModuleInterop": true
  }
}
```


# Initializing a prisma project
```bash
npx prisma init
```

> This command created a new directory called prisma which contains a file named schema.prisma and a .env file in the root of the project. schema.prisma contains the Prisma schema with your database connection and the Prisma Client generator. .env is a dotenv file for defining environment variables (used for your database connection).


# Setting up the database connection
Edit your `prisma/schema.prisma` file:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

Add the connection string to  your `.env` file:
```env
DATABASE_URL="postgresql://<USER>:<PASSWORD>@localhost:5432/<DB_NAME>?schema=public"
```

# Running migrations

```bash
npx prisma migrate dev --name init
```


# Integration tests

Install Jest dependencies
```bash
yarn add jest-environment-node jest ts-jest @types/jest -D
```

# Initializing Jest

```
yarn jest --init
```

# Add these configurations to jest.config.ts

```
import { compilerOptions } from './tsconfig.json';
import { pathsToModuleNameMapper } from 'ts-jest/utils';

{
  ...otherConfigs,
  preset: 'ts-jest',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>'
  })
}
```


Execute migrations on your `jest-environment-node` file using `execSync` lib.
```typescript
const { execSync } = require('child_process');
const prismaCli = './node_modules/.bin/prisma';

execSync(`${prismaCli} migrate dev`);
```

You can load your test environment variables on jest-environment-file using the lib `dotenv`
```typescript
require('dotenv').config({
  path: '.env.test',
});
```

You can overwrite environment variables this way:
```typescript
this.global.process.env.DATABASE_URL = process.env.DATABASE_URL = 'NEW_VALUE';
```

Invoke the jest environment file before you execute your tests adding a comment block on the top of your test file
```typescript
/**
 * @jest-environment ./src/configs/jest-environment
 */
```

# Tips
- Install [Prisma](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma) extension on your VSCode

# Useful links
- [Prisma Docs](https://www.prisma.io/docs/)
- [Prisma Studio](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/next-steps-typescript-postgres/#explore-the-data-in-prisma-studio)