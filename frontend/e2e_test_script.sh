docker compose -f ../docker-compose.dev.yml up -d &&
npm run cy:run &&
docker compose -f ../docker-compose.dev.yml down