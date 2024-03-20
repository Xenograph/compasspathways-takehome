/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Date: { input: any; output: any };
};

export type Account = {
  __typename?: 'Account';
  _id: Scalars['ID']['output'];
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
  _id: Scalars['ID']['output'];
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
  more: Scalars['Boolean']['output'];
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
  _id: Scalars['ID']['input'];
};

export type QueryCustomersArgs = {
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  searchFilter?: InputMaybe<Scalars['String']['input']>;
};

export type TierAndDetails = {
  __typename?: 'TierAndDetails';
  active: Scalars['Boolean']['output'];
  benefits: Array<Scalars['String']['output']>;
  id: Scalars['String']['output'];
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

export type GetAccountQueryVariables = Exact<{
  accountId: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
}>;

export type GetAccountQuery = {
  __typename?: 'Query';
  account?: {
    __typename?: 'Account';
    accountId: number;
    limit: number;
    products: Array<string>;
    transactions: {
      __typename?: 'TransactionPage';
      more: boolean;
      items: Array<{
        __typename?: 'Transaction';
        date: any;
        amount: number;
        transactionCode: string;
        symbol: string;
        price: string;
        total: string;
      }>;
    };
  } | null;
};

export type GetCustomerQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type GetCustomerQuery = {
  __typename?: 'Query';
  customer?: {
    __typename?: 'Customer';
    username: string;
    name: string;
    address: string;
    birthdate: any;
    email: string;
    accounts: Array<{
      __typename?: 'Account';
      accountId: number;
      limit: number;
      products: Array<string>;
    }>;
    tierAndDetails: Array<{
      __typename?: 'TierAndDetails';
      id: string;
      tier: string;
      benefits: Array<string>;
      active: boolean;
    }>;
  } | null;
};

export type ListCustomersQueryVariables = Exact<{
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  searchFilter?: InputMaybe<Scalars['String']['input']>;
}>;

export type ListCustomersQuery = {
  __typename?: 'Query';
  customers: {
    __typename?: 'CustomerPage';
    more: boolean;
    items: Array<{
      __typename?: 'Customer';
      _id: string;
      username: string;
      name: string;
      email: string;
    }>;
  };
};

export const GetAccountDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetAccount' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'accountId' }
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'page' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'pageSize' }
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'account' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'accountId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'accountId' }
                }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'accountId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'limit' } },
                { kind: 'Field', name: { kind: 'Name', value: 'products' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'transactions' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'page' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'page' }
                      }
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'pageSize' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'pageSize' }
                      }
                    }
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'items' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'date' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'amount' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'transactionCode' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'symbol' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'price' }
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'total' }
                            }
                          ]
                        }
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'more' } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GetAccountQuery, GetAccountQueryVariables>;
export const GetCustomerDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetCustomer' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
          }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'customer' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: '_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'address' } },
                { kind: 'Field', name: { kind: 'Name', value: 'birthdate' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'accounts' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'accountId' }
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'limit' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'products' }
                      }
                    ]
                  }
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'tierAndDetails' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'tier' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'benefits' }
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'active' } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<GetCustomerQuery, GetCustomerQueryVariables>;
export const ListCustomersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'ListCustomers' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'page' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'pageSize' }
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } }
          }
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'searchFilter' }
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
        }
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'customers' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'page' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'page' }
                }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pageSize' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'pageSize' }
                }
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'searchFilter' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'searchFilter' }
                }
              }
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'username' }
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } }
                    ]
                  }
                },
                { kind: 'Field', name: { kind: 'Name', value: 'more' } }
              ]
            }
          }
        ]
      }
    }
  ]
} as unknown as DocumentNode<ListCustomersQuery, ListCustomersQueryVariables>;
