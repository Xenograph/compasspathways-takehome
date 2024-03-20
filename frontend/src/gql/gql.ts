/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  '\n      query GetAccount($accountId: Int!, $page: Int!, $pageSize: Int!) {\n        account(accountId: $accountId) {\n          accountId\n          limit\n          products\n          transactions(page: $page, pageSize: $pageSize) {\n            items {\n              date\n              amount\n              transactionCode\n              symbol\n              price\n              total\n            }\n            more\n          }\n        }\n      }\n    ':
    types.GetAccountDocument,
  '\n      query GetCustomer($id: ID!) {\n        customer(_id: $id) {\n          username\n          name\n          address\n          birthdate\n          email\n          accounts {\n            accountId\n            limit\n            products\n          }\n          tierAndDetails {\n            id\n            tier\n            benefits\n            active\n          }\n        }\n      }\n    ':
    types.GetCustomerDocument,
  '\n      query ListCustomers($page: Int!, $pageSize: Int!, $searchFilter: String) {\n        customers(\n          page: $page\n          pageSize: $pageSize\n          searchFilter: $searchFilter\n        ) {\n          items {\n            _id\n            username\n            name\n            email\n          }\n          more\n        }\n      }\n    ':
    types.ListCustomersDocument
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      query GetAccount($accountId: Int!, $page: Int!, $pageSize: Int!) {\n        account(accountId: $accountId) {\n          accountId\n          limit\n          products\n          transactions(page: $page, pageSize: $pageSize) {\n            items {\n              date\n              amount\n              transactionCode\n              symbol\n              price\n              total\n            }\n            more\n          }\n        }\n      }\n    '
): (typeof documents)['\n      query GetAccount($accountId: Int!, $page: Int!, $pageSize: Int!) {\n        account(accountId: $accountId) {\n          accountId\n          limit\n          products\n          transactions(page: $page, pageSize: $pageSize) {\n            items {\n              date\n              amount\n              transactionCode\n              symbol\n              price\n              total\n            }\n            more\n          }\n        }\n      }\n    '];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      query GetCustomer($id: ID!) {\n        customer(_id: $id) {\n          username\n          name\n          address\n          birthdate\n          email\n          accounts {\n            accountId\n            limit\n            products\n          }\n          tierAndDetails {\n            id\n            tier\n            benefits\n            active\n          }\n        }\n      }\n    '
): (typeof documents)['\n      query GetCustomer($id: ID!) {\n        customer(_id: $id) {\n          username\n          name\n          address\n          birthdate\n          email\n          accounts {\n            accountId\n            limit\n            products\n          }\n          tierAndDetails {\n            id\n            tier\n            benefits\n            active\n          }\n        }\n      }\n    '];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      query ListCustomers($page: Int!, $pageSize: Int!, $searchFilter: String) {\n        customers(\n          page: $page\n          pageSize: $pageSize\n          searchFilter: $searchFilter\n        ) {\n          items {\n            _id\n            username\n            name\n            email\n          }\n          more\n        }\n      }\n    '
): (typeof documents)['\n      query ListCustomers($page: Int!, $pageSize: Int!, $searchFilter: String) {\n        customers(\n          page: $page\n          pageSize: $pageSize\n          searchFilter: $searchFilter\n        ) {\n          items {\n            _id\n            username\n            name\n            email\n          }\n          more\n        }\n      }\n    '];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
