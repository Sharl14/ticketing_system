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
