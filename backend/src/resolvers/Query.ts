import { QueryResolvers } from "../generated/graphql";

const Query: QueryResolvers = {
  customers: async (_parent, { page, pageSize }, ctx) =>
    ctx.dataSource.listCustomers(page, pageSize),
};

export default Query;
