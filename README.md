# Compass Pathways Takehome Interview Assignment

**Author:** Douglas Browne

This repository contains the backend and frontend code for the Compass Pathways takehome interview assignment.

# Backend

The backend is a NodeJS application written in TypeScript which serves a GraphQL API using Apollo Server.

## Running the backend

For local testing, you can run the backend using Docker. Using `--net=host` will ensure easy communication with the frontend. The backend will be available at `http://localhost:4000`.

```bash
cd backend

docker build . -t takehome-backend 

docker run -it --rm --net=host \
-e MONGODB_URI="<MONGO_DB_CONNECTION_URI>" \
takehome-backend
```

## Tests

You can run tests inside the `backend` directory with `npm run test`.

# Frontend

The frontend is a NextJS React application using the new App Router and Server Components whenever possible. It uses Apollo GraphQL client to load data from the backend.

## Running the frontend

For local testing, you can run the frontend using Docker. Using `--net=host` will ensure easy communication with the backend. The frontend will be available at `http://localhost:3000`.

```bash
cd frontend

docker build . --build-arg NEXT_PUBLIC_BACKEND_URL=http://localhost:4000 -t takehome-frontend

docker run -it --rm --net=host takehome-frontend
```

## Tests

You can run tests inside the `frontend` directory with `npm run test`.