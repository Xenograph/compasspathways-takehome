import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
import resolvers from "./resolvers/index.js";
import MongoAnalyticsDataSource from "./data/MongoAnalyticsDataSource.js";
import {ApolloContext} from "./types/ApolloContext.js";

const server = new ApolloServer<ApolloContext>({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async () => ({
    dataSource: new MongoAnalyticsDataSource(process.env.MONGODB_URI),
  }),
});

console.log(`Server ready at: ${url}`);
