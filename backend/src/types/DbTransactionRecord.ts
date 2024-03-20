export interface DbTransactionRecord {
  account_id: number;
  transaction_count: number;
  bucket_start_date: Date;
  bucket_end_date: Date;
  transactions: DbTransaction[];
}

export interface DbTransaction {
  date: Date;
  amount: number;
  transaction_code: string;
  symbol: string;
  price: string;
  total: string;
}
