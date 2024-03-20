import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { getClient } from '@/lib/client';
import { graphql } from '@/gql';
import Link from 'next/link';
import CheckCircle from '@/components/icons/CheckCircle';
import { XCircle } from 'lucide-react';
import Header from '@/components/Header';
import { notFound } from 'next/navigation';

export default async function CustomerPage({
  params
}: {
  params: { id: string };
}) {
  const { data } = await getClient().query({
    query: graphql(`
      query GetCustomer($id: ID!) {
        customer(_id: $id) {
          username
          name
          address
          birthdate
          email
          accounts {
            accountId
            limit
            products
          }
          tierAndDetails {
            id
            tier
            benefits
            active
          }
        }
      }
    `),
    variables: { id: params.id }
  });

  if (!data.customer) {
    return notFound();
  }

  return (
    <>
      <Header heading={`Customer: ${data.customer.name}`} />
      <main className="p-4 flex flex-col gap-8">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg flex flex-col gap-1">
            <div className="text-4xl font-semibold">{data.customer.name}</div>
            <div>
              {data.customer.username} / {data.customer.email}
            </div>
            <div>{data.customer.address}</div>
            <div>
              <span className="font-semibold">Born:</span>{' '}
              {data.customer.birthdate.split('T')[0]}
            </div>
          </div>
          {!!data.customer.tierAndDetails.length && (
            <div className="p-4 border rounded-lg">
              <h2 className="text-center font-semibold text-xl">Tiers</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Tier</TableHead>
                    <TableHead>Benefits</TableHead>
                    <TableHead className="text-right">Active</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.customer.tierAndDetails.map((t) => (
                    <TableRow key={t.id}>
                      <TableCell className="font-medium">{t.tier}</TableCell>
                      <TableCell>{t.benefits.join(', ')}</TableCell>
                      <TableCell className="text-right">
                        {t.active ? <CheckCircle /> : <XCircle />}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
        {!!data.customer.accounts.length && (
          <div className="p-4 border rounded-lg">
            <h2 className="text-center font-semibold text-xl">Accounts</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Account ID</TableHead>
                  <TableHead>Limit</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead className="text-right"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.customer.accounts.map((a) => (
                  <TableRow key={a.accountId}>
                    <TableCell className="font-medium">{a.accountId}</TableCell>
                    <TableCell>{a.limit}</TableCell>
                    <TableCell>{a.products.join(', ')}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" asChild>
                        <Link href={`/account/${a.accountId}`}>
                          Transactions
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </main>
    </>
  );
}
