import { MongoClient, ServerApiVersion } from "mongodb";
import AnalyticsDataSource from "../types/AnalyticsDataSource";
import { DbCustomer } from "../types/DbCustomer";
import { DbAccount } from "../types/DbAccount";
import { DbTransactionRecord } from "../types/DbTransactionRecord";
import { Transaction } from "../generated/graphql";

const DB_NAME = "sample_analytics";

export default class MongoAnalyticsDataSource implements AnalyticsDataSource {
  private client: MongoClient;

  constructor(connectionUri: string) {
    this.client = new MongoClient(connectionUri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
  }

  async listCustomers(page: number, pageSize: number) {
    return this.client
      .db(DB_NAME)
      .collection<DbCustomer>("customers")
      .find()
      .skip(page * pageSize)
      .limit(pageSize)
      .toArray();
  }

  async getAccount(accountId: number) {
    return this.client
      .db(DB_NAME)
      .collection<DbAccount>("accounts")
      .findOne({ account_id: accountId });
  }

  async getTransactions(accountId: number, page: number, pageSize: number) {
    const docs = await this.client
      .db(DB_NAME)
      .collection<DbTransactionRecord>("transactions")
      .aggregate<{ transactions: Transaction[] }>([
        {
          $match: {
            account_id: accountId,
          },
        },
        {
          $unwind: "$transactions",
        },
        {
          $group: {
            _id: "account_id",
            transactions: { $push: "$transactions" },
          },
        },
        {
          $project: {
            transactions: {
              $slice: ["$transactions", page * pageSize, pageSize],
            }, // Perform pagination on the nested array
          },
        },
      ])
      .toArray();
    return docs[0].transactions;
  }
}
