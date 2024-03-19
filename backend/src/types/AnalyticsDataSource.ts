import { DbAccount } from "./DbAccount";
import { DbCustomer } from "./DbCustomer";

export default interface AnalyticsDataSource {
    listCustomers(page: number, pageSize: number): Promise<DbCustomer[]>;
    getAccount(accountId: number): Promise<DbAccount>;
}