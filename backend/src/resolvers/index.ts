import { Resolvers } from "../generated/graphql.js";
import Query from "./Query.js";
import Customer from "./Customer.js";
import Account from "./Account.js";
import Transaction from "./Transaction.js";

const resolvers: Resolvers = {
  Query,
  Customer,
  Account,
  Transaction,
};

export default resolvers;
