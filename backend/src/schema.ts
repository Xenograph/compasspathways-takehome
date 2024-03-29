import gql from 'graphql-tag';

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
    _id: ID!
    username: String!
    name: String!
    address: String!
    birthdate: Date!
    email: String!
    accounts: [Account!]!
    tierAndDetails: [TierAndDetails!]!
  }

  type TierAndDetails {
    id: String!
    tier: String!
    benefits: [String!]!
    active: Boolean!
  }

  type Account {
    _id: ID!
    accountId: Int!
    limit: Int!
    products: [String!]!
    transactions(page: Int!, pageSize: Int!): TransactionPage!
  }

  type CustomerPage {
    items: [Customer!]!
    more: Boolean!
  }

  type TransactionPage {
    items: [Transaction!]!
    more: Boolean!
  }

  type Query {
    customers(searchFilter: String, page: Int!, pageSize: Int!): CustomerPage!
    customer(_id: ID!): Customer
    account(accountId: Int!): Account
  }
`;
