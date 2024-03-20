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
    const customers = await this.client
      .db(DB_NAME)
      .collection<DbCustomer>("customers")
      .find()
      .skip((page - 1) * pageSize)
      .limit(pageSize + 1)
      .toArray();
    return {
      items: customers,
      more: customers.length > pageSize,
    };
  }

  async getAccount(accountId: number) {
    return this.client
      .db(DB_NAME)
      .collection<DbAccount>("accounts")
      .findOne({ account_id: accountId });
  }

  async listTransactions(accountId: number, page: number, pageSize: number) {
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
              $slice: ["$transactions", (page - 1) * pageSize, pageSize],
            }, // Perform pagination on the nested array
          },
        },
      ])
      .toArray();
    if (!docs.length) {
      return {
        items: [],
        more: false,
      };
    }
    return {
      items: docs[0].transactions,
      more: docs[0].transactions.length > pageSize,
    };
  }

  async getCustomer(username: string) {
    return this.client
      .db(DB_NAME)
      .collection<DbCustomer>("customers")
      .findOne({ username });
  }
}
