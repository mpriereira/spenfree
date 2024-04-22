# Spenfree

Spenfree is an application to track your day-to-day expenses and accounts

## Getting Started

First, install the dependencies:

```bash
pnpm install
```

Create a file named .env.local from .env. Set up your local environment variables, 
you will need a postgres database

Then, to create the schema and fill it with some basic data, run:

```bash
pnpm prisma-push:local
pnpm prisma-seed:local
```

Finally, run the project with:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.
