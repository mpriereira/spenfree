# Spenfree

Spenfree is an application to track your day-to-day expenses and accounts

## Getting Started

First, install the dependencies:

```bash
pnpm install
```

Create a file named `.env.local` from the provided template `.env`.
Set up your local environment variables, you will need a postgres database.

Create one easily in a docker container by running:
```bash
docker-compose up -d
```

Then, you will have a local postgres database with the following connection URI:
`postgresql://postgres:*tdh7tAU4!@localhost:5432/postgres`

Set that value in your `.env.local` file. To create the schema and fill it with some basic data, run:

```bash
pnpm prisma-push:local
pnpm prisma-seed:local
```

Finally, run the project with:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.
