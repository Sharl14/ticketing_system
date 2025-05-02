import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
const IssueSchema = z.object({
  title: z
    .string()
    .min(5, "Minimum 5 character is required")
    .max(50, "title should not be more then 50 character"),
  description: z.string().min(5, "Minimum 5 character is required"),
});
export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = IssueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json("Invalid data", { status: 402 });
  }
  const data = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(data, { status: 201 });
}
