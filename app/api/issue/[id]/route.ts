import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const formSchema = z.object({
  title: z
    .string()
    .min(6, { message: "title is required minimum 6 character" })
    .max(50)
    .optional(),
  description: z
    .string()
    .min(12, { message: "description is required minimum 12 character" })
    .max(200)
    .optional(),
  userId: z
    .string()
    .min(1, { message: "assigned to user id is required" })
    .max(200)
    .optional()
    .nullable(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const issue = await prisma.issue.findUnique({ where: { id } });
  if (!issue) {
    return NextResponse.json({ error: "No issue found" }, { status: 400 });
  }

  const body = await request.json();
  const validation = formSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json({ error: "Validation failed" }, { status: 400 });
  }

  const { title, description, userId } = body;
  if (userId) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json({ error: "Invalid user" }, { status: 400 });
    }
  }

  const response = await prisma.issue.update({
    where: { id },
    data: {
      title,
      description,
      userId,
    },
  });

  return NextResponse.json({ response }, { status: 202 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const issue = await prisma.issue.findUnique({ where: { id } });
  if (!issue) {
    return NextResponse.json({ error: "No issue found" }, { status: 404 });
  }

  await prisma.issue.delete({
    where: { id },
  });

  return NextResponse.json({ success: "Issue is deleted" }, { status: 202 });
}

export async function UPDATE_ISSUE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Check if the issue exists
  const issue = await prisma.issue.findUnique({ where: { id } });
  if (!issue) {
    return NextResponse.json({ error: "No issue found" }, { status: 400 });
  }

  // Parse and validate the request body
  const body = await request.json();
  const validation = z
    .object({
      status: z.string().min(1).max(50).optional(),
    })
    .safeParse(body);

  if (!validation.success) {
    return NextResponse.json({ error: "Validation failed" }, { status: 400 });
  }

  const { status } = body;

  // Update the issue if a valid status is provided
  if (status) {
    try {
      const updatedIssue = await prisma.issue.update({
        where: { id },
        data: { status },
      });
      return NextResponse.json({ updatedIssue }, { status: 202 });
    } catch (error) {
      console.error("Error updating issue:", error);
      return NextResponse.json(
        { error: "Failed to update issue" },
        { status: 500 }
      );
    }
  }

  // Fallback response if no valid fields are provided
  return NextResponse.json(
    { error: "No valid fields to update" },
    { status: 400 }
  );
}
