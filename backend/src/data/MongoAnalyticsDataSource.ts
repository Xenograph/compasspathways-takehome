import { MongoClient, ServerApiVersion } from "mongodb";
import AnalyticsDataSource from "../types/AnalyticsDataSource";
import { DbCustomer } from "../types/DbCustomer";
import { DbAccount } from "../types/DbAccount";

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
    return await this.client
      .db(DB_NAME)
      .collection<DbCustomer>("customers")
      .find()
      .skip(page * pageSize)
      .limit(pageSize)
      .toArray();
  }

  async getAccount(accountId: number) {
    const doc = await this.client
      .db(DB_NAME)
      .collection<DbAccount>("accounts")
      .findOne({ account_id: accountId });
      return doc;
  }
}
