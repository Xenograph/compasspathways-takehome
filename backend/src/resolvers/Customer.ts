import { CustomerResolvers } from '../generated/graphql';

const Query: CustomerResolvers = {
  accounts: (parent, _args, ctx) =>
    Promise.all(
      parent.accounts.map((accountId) => ctx.dataSource.getAccount(accountId))
    ),
  tierAndDetails: (parent, _args, ctx) => Object.values(parent.tier_and_details)
};

export default Query;
