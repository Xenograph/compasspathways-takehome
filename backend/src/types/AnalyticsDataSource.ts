import { DbAccount } from "./DbAccount";
import { DbCustomer } from "./DbCustomer";
import { DbTransaction } from "./DbTransactionRecord";
import PagedData from "./PagedData";

export default interface AnalyticsDataSource {
  listCustomers(page: number, pageSize: number): Promise<PagedData<DbCustomer>>;
  getAccount(accountId: number): Promise<DbAccount>;
  listTransactions(
    accountId: number,
    page: number,
    pageSize: number
  ): Promise<PagedData<DbTransaction>>;
  getCustomer(_id: string): Promise<DbCustomer>;
}
