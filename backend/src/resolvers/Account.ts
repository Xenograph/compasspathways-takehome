import { AccountResolvers } from "../generated/graphql";

const Query: AccountResolvers = {
  accountId: (parent, _args, _ctx) => parent.account_id,
  transactions: (parent, { page, pageSize }, ctx) =>
    ctx.dataSource.listTransactions(parent.account_id, page, pageSize),
};

export default Query;
