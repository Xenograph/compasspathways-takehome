import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
import AnalyticsDataSource from "../types/AnalyticsDataSource";
import { DbCustomer } from "../types/DbCustomer";
import { DbAccount } from "../types/DbAccount";
import {
  DbTransaction,
  DbTransactionRecord,
} from "../types/DbTransactionRecord";

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

  async listCustomers(page: number, pageSize: number, searchFilter?: string) {
    const customers = await this.client
      .db(DB_NAME)
      .collection<DbCustomer>("customers")
      .find(
        searchFilter
          ? {
              $or: [
                { username: { $regex: searchFilter, $options: "i" } }, // Case-insensitive regex match
                { name: { $regex: searchFilter, $options: "i" } },
                { email: { $regex: searchFilter, $options: "i" } },
              ],
            }
          : {}
      )
      .skip((page - 1) * pageSize)
      .limit(pageSize + 1)
      .toArray();
    return {
      items:
        customers.length > pageSize ? customers.slice(0, pageSize) : customers,
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
      .aggregate<{ transactions: DbTransaction[] }>([
        {
          $match: {
            account_id: accountId,
          },
        },
        {
          $unwind: "$transactions",
        },
        {
          $sort: {
            "transactions.date": -1,
          },
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
              $slice: ["$transactions", (page - 1) * pageSize, pageSize + 1],
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
      items:
        docs[0].transactions.length > pageSize
          ? docs[0].transactions.slice(0, pageSize)
          : docs[0].transactions,
      more: docs[0].transactions.length > pageSize,
    };
  }

  async getCustomer(_id: string) {
    return this.client
      .db(DB_NAME)
      .collection<DbCustomer>("customers")
      .findOne({ _id: new ObjectId(_id) });
  }
}
