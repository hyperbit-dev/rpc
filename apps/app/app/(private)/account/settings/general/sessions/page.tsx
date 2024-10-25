"use client";

import {
  Card,
  CardBody,
  CardHeader,
  TableBody,
  TableCard,
  TableCell,
  TableHead,
  TableHeading,
  TableRow,
  TableWrapper,
} from "@/components";
import { useListSessionsQuery } from "@/lib/queries";

export default function SettingsGeneralSessionsPage() {
  const listSessionsQuery = useListSessionsQuery({});
  console.log("listSessionsQuery", listSessionsQuery.data);

  return (
    <Card>
      <CardHeader>Sessions</CardHeader>
      <TableCard>
        <TableWrapper>
          <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
            <TableHead>
              <TableRow>
                <TableHeading>Test</TableHeading>
                <TableHeading>Test</TableHeading>
                <TableHeading>Test</TableHeading>
                <TableHeading>Test</TableHeading>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>asdf</TableCell>
                <TableCell>asdf</TableCell>
                <TableCell>asdf</TableCell>
                <TableCell>asdf</TableCell>
              </TableRow>
            </TableBody>
          </table>
        </TableWrapper>
      </TableCard>
    </Card>
  );
}
