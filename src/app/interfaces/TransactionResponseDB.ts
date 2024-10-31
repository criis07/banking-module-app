export interface TransactionResponseDB{
    transactionID: string;
  accountRowID: number;
  date: string;
  description: string;
  amount: number;
  currencyCode: string;
  category: string;
  type: string;
  status: number;
  modifiedOn: string;
  createdOn: string;
  cleared: number;
}