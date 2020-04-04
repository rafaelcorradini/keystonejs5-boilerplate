# KeystoneJS 5 Boilerplate

A keystonejs 5 boilerplate with some useful stuff: eslint, dotenv, express, views, docker, authentication by role, etc.

## Running the Project.

If you want to use docker to start mongodb, run `sudo docker compose up -d` (make sure you have docker and docker-compose packages installed).

Then run `npm install` and after `npm run dev`

Once running, the Keystone Admin UI is reachable via `localhost:3000/admin`.

## Next steps

This example has no front-end application but you can build your own using the GraphQL API (`http://localhost:3000/admin/graphiql`).
