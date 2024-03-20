import { QueryResolvers } from "../generated/graphql";

const Query: QueryResolvers = {
  customers: async (_parent, { page, pageSize }, ctx) =>
    ctx.dataSource.listCustomers(page, pageSize),
  customer: async (_parent, { _id }, ctx) =>
    ctx.dataSource.getCustomer(_id),
  account: async (_parent, { accountId }, ctx) =>
    ctx.dataSource.getAccount(accountId),
};

export default Query;
