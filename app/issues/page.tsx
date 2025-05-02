import Link from "next/link";
import React from "react";
import { buttonVariants } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import IssueStatusBadge from "@/components/general/IssueStatusBadge";

const IssuePage = async () => {
  const issues = await prisma.issue.findMany();
  if (!issues) notFound();
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
            {issues.map((issue) => (
              <TableRow key={issue.id}>
                <TableCell>
                  <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                </TableCell>
                <TableCell>
                  <IssueStatusBadge status={issue.status} />
                </TableCell>
                <TableCell>{issue.createdAt.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default IssuePage;
