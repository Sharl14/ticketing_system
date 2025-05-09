import React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import IssueStatusFilter from "./IssueSatusFilter";
const IssueAction = () => {
  return (
    <div className="flex items-center justify-between">
      <IssueStatusFilter />
      <Link
        href="/issues/create"
        className={`${buttonVariants({ variant: "secondary" })} mb-4`}
      >
        Create Issue
      </Link>
    </div>
  );
};

export default IssueAction;
