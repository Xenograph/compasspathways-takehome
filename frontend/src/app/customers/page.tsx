import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { getClient } from "@/lib/client";
import { graphql } from "@/gql";
import Link from "next/link";
import Paginator from "@/components/Paginator";
import Header from "@/components/Header";

const PAGE_SIZE = 15;

export default async function Accounts({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const pageNum = Number(searchParams.page) || 1;
  const { data } = await getClient().query({
    query: graphql(`
      query ListCustomers($page: Int!, $pageSize: Int!) {
        customers(page: $page, pageSize: $pageSize) {
          items {
            _id
            username
            name
            email
          }
          more
        }
      }
    `),
    variables: { page: pageNum, pageSize: PAGE_SIZE },
  });

  return (
    <>
      <Header heading={`Customers`} />
      <main className="p-4 m-4 rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Username</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.customers.items.map((c) => (
              <TableRow key={c._id}>
                <TableCell className="font-medium">{c.username}</TableCell>
                <TableCell>{c.name}</TableCell>
                <TableCell>{c.email}</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" asChild>
                    <Link href={`/customer/${c._id}`}>View</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
      <Paginator paramName="page" more={data.customers.more} />
    </>
  );
}
