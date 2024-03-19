import { AccountResolvers } from "../generated/graphql";

const Query: AccountResolvers = {
  accountId: async (parent, _args, ctx) => parent.account_id,
};

export default Query;
