# Installing dependencies

```bash
yarn add prisma -D
yarn add @prisma/client
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

# Tips
- Install [Prisma](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma) extension on your VSCode

# Useful links
- [Prisma Docs](https://www.prisma.io/docs/)
- [Prisma Studio](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/next-steps-typescript-postgres/#explore-the-data-in-prisma-studio)