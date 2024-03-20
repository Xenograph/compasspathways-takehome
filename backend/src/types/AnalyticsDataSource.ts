import { Transaction } from "../generated/graphql";
import { DbAccount } from "./DbAccount";
import { DbCustomer } from "./DbCustomer";
import PagedData from "./PagedData";

export default interface AnalyticsDataSource {
  listCustomers(page: number, pageSize: number): Promise<PagedData<DbCustomer>>;
  getAccount(accountId: number): Promise<DbAccount>;
  listTransactions(
    accountId: number,
    page: number,
    pageSize: number
  ): Promise<PagedData<Transaction>>;
  getCustomer(_id: string): Promise<DbCustomer>;
}
