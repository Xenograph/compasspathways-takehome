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

export default async function Home({ searchParams }: { searchParams: any }) {
  const pageNum = Number(searchParams.page) || 1;

  const { data } = await getClient().query({
    query: graphql(`
      query ListCustomers($page: Int!, $pageSize: Int!) {
        customers(page: $page, pageSize: $pageSize) {
          items {
            username
            name
            email
          }
          more
        }
      }
    `),
    variables: { page: pageNum, pageSize: 10 },
  });

  return (
    <>
      <header className="flex justify-between items-center shadow-md min-h-16 px-5">
        <button>Go Back</button>
        <h1>Customers</h1>
        <button>Logout</button>
      </header>
      <main className="p-4">
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
              <TableRow>
                <TableCell className="font-medium">{c.username}</TableCell>
                <TableCell>{c.name}</TableCell>
                <TableCell>{c.email}</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" asChild>
                    <Link href={`/customer/${c.username}`}>View</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Paginator pageNum={pageNum} more={data.customers.more} />
      </main>
    </>
  );
}
