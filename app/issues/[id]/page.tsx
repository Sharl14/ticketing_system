import React from "react";
import { prisma } from "@/lib/prisma";
import IssueDetail from "../_components/IssueDetail";

// Fetch issue from database
async function getIssue(id: string) {
  const issue = await prisma.issue.findUnique({
    where: {
      id,
    },
  });
  if (!issue) {
    throw new Error("Issue not found");
  }

  return issue;
}

const IssueDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const issue = await getIssue(id);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <IssueDetail issue={issue} />
    </div>
  );
};

export default IssueDetailsPage;
