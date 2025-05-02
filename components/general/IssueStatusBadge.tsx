import React from "react";
import { Status } from "@/lib/generated/prisma";
import { Badge } from "../ui/badge";

const badgeStatus: Record<
  Status,
  { label: string; color: "green" | "purple" | "red" }
> = {
  OPEN: { label: "Open", color: "green" },
  IN_PROGRESS: { label: "In Progress", color: "purple" },
  CLOSED: { label: "Closed", color: "red" },
};

// Tailwind badge color mapping
const colorMap: Record<string, string> = {
  green: "bg-green-100 text-green-800",
  purple: "bg-purple-100 text-purple-800",
  red: "bg-red-100 text-red-800",
};

const IssueStatusBadge = ({ status }: { status: Status }) => {
  const { label, color } = badgeStatus[status];
  return <Badge className={colorMap[color]}>{label}</Badge>;
};

export default IssueStatusBadge;
