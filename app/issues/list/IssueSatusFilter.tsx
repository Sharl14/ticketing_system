"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Status } from "@/lib/generated/prisma";
import { useRouter } from "next/navigation";
const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "InProgress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  return (
    <Select
      onValueChange={(status) => {
        const query = status !== "All" ? `?status=${status}` : "";
        router.push(`/issues/list/${query}`);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter by status...." />
      </SelectTrigger>
      <SelectContent>
        {statuses.map((status) => (
          <SelectItem value={status.value || "All"} key={status.label}>
            {status.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default IssueStatusFilter;
