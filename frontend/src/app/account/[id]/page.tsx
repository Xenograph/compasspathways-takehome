import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { getClient } from '@/lib/client';
import { graphql } from '@/gql';
import Header from '@/components/Header';
import Paginator from '@/components/Paginator';
import { notFound } from 'next/navigation';

const PAGE_SIZE = 10;

function formatCurrency(value: string) {
  return '$' + formatNumberWithCommas(parseFloat(value).toFixed(2));
}

function formatNumberWithCommas(num: number | string) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export default async function AccountPage({
  params,
  searchParams
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const pageNum = Number(searchParams.page) || 1;

  const { data } = await getClient().query({
    query: graphql(`
      query GetAccount($accountId: Int!, $page: Int!, $pageSize: Int!) {
        account(accountId: $accountId) {
          accountId
          limit
          products
          transactions(page: $page, pageSize: $pageSize) {
            items {
              date
              amount
              transactionCode
              symbol
              price
              total
            }
            more
          }
        }
      }
    `),
    variables: {
      accountId: Number(params.id),
      page: pageNum,
      pageSize: PAGE_SIZE
    }
  });

  if (!data.account) {
    return notFound();
  }

  return (
    <>
      <Header heading={`Account: ${data.account.accountId}`} />
      <main className="p-4 flex flex-col gap-8">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg flex flex-col gap-1">
            <div className="text-4xl font-semibold">
              Account #{data.account.accountId}
            </div>
            <div>
              <span className="font-semibold">Limit:</span> $
              {formatNumberWithCommas(data.account.limit)}
            </div>
            <div>
              <span className="font-semibold">Products:</span>{' '}
              {data.account.products.join(', ')}
            </div>
          </div>
        </div>
        {!!data.account.transactions.items.length && (
          <div className="p-4 border rounded-lg">
            <h2 className="text-center font-semibold text-xl">Transactions</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Symbol</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.account.transactions.items.map((t) => (
                  <TableRow key={`${t.date}:${t.symbol}:${t.total}:${t.price}`}>
                    <TableCell className="font-medium">
                      {t.date.split('T')[0]}
                    </TableCell>
                    <TableCell>{t.transactionCode}</TableCell>
                    <TableCell>{t.symbol.toUpperCase()}</TableCell>
                    <TableCell>{formatNumberWithCommas(t.amount)}</TableCell>
                    <TableCell>{formatCurrency(t.price)}</TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(t.total)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </main>
      <Paginator paramName="page" more={data.account.transactions.more} />
    </>
  );
}
