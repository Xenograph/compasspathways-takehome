import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { DbCustomer } from '../types/DbCustomer.js';
import { DbAccount } from '../types/DbAccount.js';
import { ApolloContext } from '../types/ApolloContext.js';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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

export type AdditionalEntityFields = {
  path?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Account: ResolverTypeWrapper<DbAccount>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Customer: ResolverTypeWrapper<DbCustomer>;
  CustomerPage: ResolverTypeWrapper<Omit<CustomerPage, 'items'> & { items: Array<ResolversTypes['Customer']> }>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  Query: ResolverTypeWrapper<{}>;
  TierAndDetails: ResolverTypeWrapper<TierAndDetails>;
  Transaction: ResolverTypeWrapper<Transaction>;
  TransactionPage: ResolverTypeWrapper<TransactionPage>;
  AdditionalEntityFields: AdditionalEntityFields;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Account: DbAccount;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  String: Scalars['String']['output'];
  Customer: DbCustomer;
  CustomerPage: Omit<CustomerPage, 'items'> & { items: Array<ResolversParentTypes['Customer']> };
  Boolean: Scalars['Boolean']['output'];
  Date: Scalars['Date']['output'];
  Query: {};
  TierAndDetails: TierAndDetails;
  Transaction: Transaction;
  TransactionPage: TransactionPage;
  AdditionalEntityFields: AdditionalEntityFields;
};

export type UnionDirectiveArgs = {
  discriminatorField?: Maybe<Scalars['String']['input']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type UnionDirectiveResolver<Result, Parent, ContextType = ApolloContext, Args = UnionDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AbstractEntityDirectiveArgs = {
  discriminatorField: Scalars['String']['input'];
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type AbstractEntityDirectiveResolver<Result, Parent, ContextType = ApolloContext, Args = AbstractEntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EntityDirectiveArgs = {
  embedded?: Maybe<Scalars['Boolean']['input']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type EntityDirectiveResolver<Result, Parent, ContextType = ApolloContext, Args = EntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ColumnDirectiveArgs = {
  overrideType?: Maybe<Scalars['String']['input']>;
};

export type ColumnDirectiveResolver<Result, Parent, ContextType = ApolloContext, Args = ColumnDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IdDirectiveArgs = { };

export type IdDirectiveResolver<Result, Parent, ContextType = ApolloContext, Args = IdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type LinkDirectiveArgs = {
  overrideType?: Maybe<Scalars['String']['input']>;
};

export type LinkDirectiveResolver<Result, Parent, ContextType = ApolloContext, Args = LinkDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EmbeddedDirectiveArgs = { };

export type EmbeddedDirectiveResolver<Result, Parent, ContextType = ApolloContext, Args = EmbeddedDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type MapDirectiveArgs = {
  path: Scalars['String']['input'];
};

export type MapDirectiveResolver<Result, Parent, ContextType = ApolloContext, Args = MapDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AccountResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Account'] = ResolversParentTypes['Account']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  accountId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  limit?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  products?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  transactions?: Resolver<ResolversTypes['TransactionPage'], ParentType, ContextType, RequireFields<AccountTransactionsArgs, 'page' | 'pageSize'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Customer'] = ResolversParentTypes['Customer']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  accounts?: Resolver<Array<ResolversTypes['Account']>, ParentType, ContextType>;
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  birthdate?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tierAndDetails?: Resolver<Array<ResolversTypes['TierAndDetails']>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerPageResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['CustomerPage'] = ResolversParentTypes['CustomerPage']> = {
  items?: Resolver<Array<ResolversTypes['Customer']>, ParentType, ContextType>;
  more?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type QueryResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  account?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType, RequireFields<QueryAccountArgs, 'accountId'>>;
  customer?: Resolver<Maybe<ResolversTypes['Customer']>, ParentType, ContextType, RequireFields<QueryCustomerArgs, 'username'>>;
  customers?: Resolver<ResolversTypes['CustomerPage'], ParentType, ContextType, RequireFields<QueryCustomersArgs, 'page' | 'pageSize'>>;
};

export type TierAndDetailsResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['TierAndDetails'] = ResolversParentTypes['TierAndDetails']> = {
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  benefits?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tier?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TransactionResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Transaction'] = ResolversParentTypes['Transaction']> = {
  amount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  symbol?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  transactionCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TransactionPageResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['TransactionPage'] = ResolversParentTypes['TransactionPage']> = {
  items?: Resolver<Array<ResolversTypes['Transaction']>, ParentType, ContextType>;
  more?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = ApolloContext> = {
  Account?: AccountResolvers<ContextType>;
  Customer?: CustomerResolvers<ContextType>;
  CustomerPage?: CustomerPageResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  TierAndDetails?: TierAndDetailsResolvers<ContextType>;
  Transaction?: TransactionResolvers<ContextType>;
  TransactionPage?: TransactionPageResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = ApolloContext> = {
  union?: UnionDirectiveResolver<any, any, ContextType>;
  abstractEntity?: AbstractEntityDirectiveResolver<any, any, ContextType>;
  entity?: EntityDirectiveResolver<any, any, ContextType>;
  column?: ColumnDirectiveResolver<any, any, ContextType>;
  id?: IdDirectiveResolver<any, any, ContextType>;
  link?: LinkDirectiveResolver<any, any, ContextType>;
  embedded?: EmbeddedDirectiveResolver<any, any, ContextType>;
  map?: MapDirectiveResolver<any, any, ContextType>;
};

import { ObjectId } from 'mongodb';