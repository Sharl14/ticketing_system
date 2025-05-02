import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
const formSchema = z.object({
  title: z
    .string()
    .min(6, { message: "title is required minimum 6 character" })
    .max(50),
  description: z
    .string()
    .min(12, { message: "description is required minimum 12 character" })
    .max(200),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const validation = formSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json({ error: "Validation failed" }, { status: 400 });
  }

  const issue = await prisma.issue.findUnique({ where: { id } });
  if (!issue) {
    return NextResponse.json({ error: "No issue found" }, { status: 404 });
  }

  const response = await prisma.issue.update({
    where: { id },
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json({ response }, { status: 202 });
}
