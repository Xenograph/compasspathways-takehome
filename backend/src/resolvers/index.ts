import { Resolvers } from "../generated/graphql.js";
import Query from "./Query.js";
import Customer from "./Customer.js";
import Account from "./Account.js";

const resolvers: Resolvers = {
  Query,
  Customer,
  Account
}

export default resolvers;