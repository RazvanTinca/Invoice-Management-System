# Server

cd server
npm install
cp .env.example .env
cd .. && docker-compose up -d && cd server
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed

cd ..

# Client
cd client
npm install
cp .env.example .env
npm run api

# Concurrently run both server and client
cd ..
cd server
npm run start:concurrently