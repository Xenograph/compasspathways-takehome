import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "src/schema.ts",
  generates: {
    "src/generated/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-resolvers",
        "typescript-mongodb",
        "typescript-document-nodes",
      ],
      config: {
        contextType: "../types/ApolloContext.js#ApolloContext",
        mappers: {
          Customer: "../types/DbCustomer.js#DbCustomer",
          Account: "../types/DbAccount.js#DbAccount",
        },
      },
    },
    "./graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
};

export default config;
