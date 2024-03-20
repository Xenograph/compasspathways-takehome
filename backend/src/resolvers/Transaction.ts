import { AccountResolvers, TransactionResolvers } from '../generated/graphql';

const Query: TransactionResolvers = {
  transactionCode: (parent, _args, _ctx) => parent.transaction_code
};

export default Query;
