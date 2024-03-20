import AnalyticsDataSource from '../types/AnalyticsDataSource';
import { DbCustomer } from '../types/DbCustomer';
import { DbAccount } from '../types/DbAccount';
import { DbTransaction } from '../types/DbTransactionRecord';

export default class FakeAnalyticsDataSource implements AnalyticsDataSource {
  constructor(
    private customers: DbCustomer[],
    private accounts: DbAccount[],
    private transactions: {[accountId: string]: DbTransaction[]}
  ) {}

  async listCustomers(page: number, pageSize: number, searchFilter?: string) {
    const filteredCustomers = searchFilter
      ? this.customers.filter(
          (c) =>
            c.name.includes(searchFilter) ||
            c.email.includes(searchFilter) ||
            c.username.includes(searchFilter)
        )
      : this.customers;
    const skip = (page - 1) * pageSize;
    if (skip >= filteredCustomers.length) return { items: [], more: false };
    return {
      items: filteredCustomers.slice(skip, skip + pageSize),
      more: filteredCustomers.length > skip + pageSize
    };
  }

  async getAccount(accountId: number) {
    return this.accounts.find((a) => a.account_id === accountId);
  }

  async listTransactions(accountId: number, page: number, pageSize: number) {
    const accountTxns = this.transactions[accountId];
    if(!accountTxns) return {items: [], more: false};
    const skip = (page - 1) * pageSize;
    if (skip >= accountTxns.length) return { items: [], more: false };
    return {
      items: accountTxns.slice(skip, skip + pageSize),
      more: accountTxns.length > skip + pageSize
    };
  }

  async getCustomer(_id: string) {
    return this.customers.find((c) => c._id.toString() === _id);
  }
}
