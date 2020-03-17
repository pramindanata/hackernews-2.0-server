# Hacker News 2.0 Server

Hackernews Clone App for certification.

## Prerequisite

1. NodeJS >= v10.~
2. NPM >= v6.~
3. PostgreSQL >= v11.~

## Development

1. Create `.env` file based from `.env.example` in this project root folder.
2. Set DB configuration in `.env` file.
3. Run `npm install` to install all depedencies.
4. Create new DB on PostgreSQL. All tables will be synchronize (or create new one if not exists) after running `npm run dev` command.
5. Run `npm run dev` to start dev server. Make sure DB also running.
