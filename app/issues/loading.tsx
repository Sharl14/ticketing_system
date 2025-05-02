import Link from "next/link";
import React from "react";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const LoadingIssue = () => {
  const issues = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div className="mt-4">
      <Link
        href="/issues/create"
        className={`${buttonVariants({ variant: "secondary" })} mb-4`}
      >
        Create Issue
      </Link>
      <h1>List of Issues</h1>

      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>IssueDate</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {issues.map((issue, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className="h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default LoadingIssue;
