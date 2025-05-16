/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import React from "react";

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
import IssueAction from "./IssueAction";
import { Status } from "@/lib/generated/prisma";
import { ArrowDown, ArrowUp } from "lucide-react";
import Pagination from "@/components/general/Pagination";

// Issue Page

const IssuePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;
  const statusParam = params.status;

  const sortBy =
    typeof params.sortBy === "string" ? params.sortBy : "createdAt";
  const sortOrder =
    typeof params.sortOrder === "string" ? params.sortOrder : "desc";
  const page =
    typeof params.page === "string" ? Number.parseInt(params.page) : 1;
  const validStatuses: Status[] = ["OPEN", "IN_PROGRESS", "CLOSED"];
  const filterStatus = validStatuses.includes(statusParam as Status)
    ? (statusParam as Status)
    : undefined;

  const pageSize = 4;

  const orderBy: any = {};
  if (sortBy === "title" || sortBy === "status" || sortBy === "createdAt") {
    orderBy[sortBy] = sortOrder === "asc" ? "asc" : "desc";
  } else {
    orderBy["createdAt"] = "desc";
  }

  const issues = await prisma.issue.findMany({
    where: { status: filterStatus },
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  // total nuber of issue
  const issueCount = await prisma.issue.count({
    where: { status: filterStatus },
  });

  if (!issues) notFound();

  const getSortLink = (column: string) => {
    const newOrder = sortBy === column && sortOrder === "asc" ? "desc" : "asc";
    const order = sortBy === column ? newOrder : "asc";
    const newParams = new URLSearchParams();
    if (statusParam) {
      newParams.set("status", statusParam as string);
    }
    newParams.set("sortBy", column);
    newParams.set("sortOrder", order);
    newParams.set("page", page.toString());
    return `?${newParams.toString()}`;
  };

  const renderSortIndicator = (column: string) => {
    if (sortBy !== column) return null;

    return sortOrder === "asc" ? (
      <ArrowUp className="inline ml-1 w-4 h-4" />
    ) : (
      <ArrowDown className="inline ml-1 w-4 h-4" />
    );
  };

  return (
    <div className="mt-4">
      <IssueAction />
      <h1>List of Issues</h1>

      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Link href={getSortLink("title")}>
                  Title {renderSortIndicator("title")}
                </Link>
              </TableHead>
              <TableHead>
                <Link href={getSortLink("status")}>
                  Status {renderSortIndicator("status")}
                </Link>
              </TableHead>
              <TableHead>
                <Link href={getSortLink("createdAt")}>
                  IssueDate {renderSortIndicator("createdAt")}
                </Link>
              </TableHead>
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
      <div className="my-4">
        <Pagination
          itemCount={issueCount}
          pageSize={pageSize}
          currentPage={page}
        />
      </div>
    </div>
  );
};

export default IssuePage;
