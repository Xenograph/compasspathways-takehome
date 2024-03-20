/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
};

export type Account = {
  __typename?: 'Account';
  accountId: Scalars['Int']['output'];
  limit: Scalars['Int']['output'];
  products: Array<Scalars['String']['output']>;
  transactions: TransactionPage;
};


export type AccountTransactionsArgs = {
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
};

export type Customer = {
  __typename?: 'Customer';
  accounts: Array<Account>;
  address: Scalars['String']['output'];
  birthdate: Scalars['Date']['output'];
  email: Scalars['String']['output'];
  name: Scalars['String']['output'];
  tierAndDetails: Array<TierAndDetails>;
  username: Scalars['String']['output'];
};

export type CustomerPage = {
  __typename?: 'CustomerPage';
  items: Array<Customer>;
  more?: Maybe<Scalars['Boolean']['output']>;
};

export type Query = {
  __typename?: 'Query';
  account?: Maybe<Account>;
  customer?: Maybe<Customer>;
  customers: CustomerPage;
};


export type QueryAccountArgs = {
  accountId: Scalars['Int']['input'];
};


export type QueryCustomerArgs = {
  username: Scalars['String']['input'];
};


export type QueryCustomersArgs = {
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
};

export type TierAndDetails = {
  __typename?: 'TierAndDetails';
  active: Scalars['Boolean']['output'];
  benefits: Array<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  tier: Scalars['String']['output'];
};

export type Transaction = {
  __typename?: 'Transaction';
  amount: Scalars['Int']['output'];
  date: Scalars['Date']['output'];
  price: Scalars['String']['output'];
  symbol: Scalars['String']['output'];
  total: Scalars['String']['output'];
  transactionCode: Scalars['String']['output'];
};

export type TransactionPage = {
  __typename?: 'TransactionPage';
  items: Array<Transaction>;
  more: Scalars['Boolean']['output'];
};

export type ListCustomersQueryVariables = Exact<{
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
}>;


export type ListCustomersQuery = { __typename?: 'Query', customers: { __typename?: 'CustomerPage', more?: boolean | null, items: Array<{ __typename?: 'Customer', username: string, name: string, email: string }> } };


export const ListCustomersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListCustomers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"more"}}]}}]}}]} as unknown as DocumentNode<ListCustomersQuery, ListCustomersQueryVariables>;