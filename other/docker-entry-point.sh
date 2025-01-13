#!/bin/sh -ex

# This takes care of applying the prisma migrations
npx prisma migrate deploy
sqlite3 /litefs/data/sqlite.db "PRAGMA journal_mode = WAL;"
sqlite3 /litefs/data/cache.db "PRAGMA journal_mode = WAL;"
npm run start # launch the node application (on port 8081)