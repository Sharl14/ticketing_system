import { Badge } from "@/components/ui/badge";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { format } from "date-fns";
import IssueEditButton from "./IssueEditButton";
import IssueDeleteButton from "./IssueDeleteButton";
import AssigneeSelect from "../[id]/AssigneeSelect";
import { Issue } from "@/lib/generated/prisma";
// interface Issue {
//   id: string;
//   title: string;
//   description: string;
//   status: string;
//   createdAt: Date | string;
// }

export default function IssueDetail({ issue }: { issue: Issue }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{issue.title}</CardTitle>
            <CardDescription className="mt-2">
              {issue.description}
            </CardDescription>
          </div>
          <Badge
            variant={
              (issue.status as string) === "open" ? "default" : "destructive"
            }
          >
            {issue.status.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Created At: {format(new Date(issue.createdAt), "MMMM d, yyyy HH:mm")}
        </p>
        <div className="flex gap-4">
          <AssigneeSelect issue={issue} />
          <IssueEditButton issueId={issue.id} />
          <IssueDeleteButton issueId={issue.id} />
        </div>
      </CardContent>
    </Card>
  );
}

// localhost:3000/issues/id/edit
