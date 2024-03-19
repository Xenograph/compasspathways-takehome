import { QueryResolvers } from "../generated/graphql";

const Query: QueryResolvers = {
  customers: async (_parent, { page, pageSize }, ctx) =>
    ctx.dataSource.listCustomers(page, pageSize),
  customer: async (_parent, { username }, ctx) =>
    ctx.dataSource.getCustomer(username),
  account: async (_parent, { accountId }, ctx) =>
    ctx.dataSource.getAccount(accountId),
};

export default Query;
