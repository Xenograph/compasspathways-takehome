import gql from "graphql-tag";

export const typeDefs = gql`
  scalar Date

  type Transaction {
    date: Date!
    amount: Int!
    transactionCode: String!
    symbol: String!
    price: String!
    total: String!
  }

  type Customer {
    username: String!
    name: String!
    address: String!
    birthdate: Date!
    email: String!
    accounts: [Account!]!
    tierAndDetails: [TierAndDetails!]!
  }

  type TierAndDetails {
    id: ID!
    tier: String!
    benefits: [String!]!
    active: Boolean!
  }

  type Account {
    accountId: Int!
    limit: Int!
    products: [String!]!
    transactions(
      page: Int!
      pageSize: Int!
    ): [Transaction!]!
  }

  type Query {
    customers(page: Int!, pageSize: Int!): [Customer!]!
    customer(username: String!): Customer
    account(accountId: Int!): Account
  }
`;