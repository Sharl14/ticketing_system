import React from "react";
import IssueForm from "@/components/general/IssueForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

const EditPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const issue = await prisma.issue.findUnique({
    where: { id },
  });
  if (!issue) notFound();
  return <IssueForm issue={issue} />;
};

export default EditPage;
