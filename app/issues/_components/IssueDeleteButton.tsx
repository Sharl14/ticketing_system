"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
interface Props {
  issueId: string;
}

export default function IssueDeleteButton({ issueId }: Props) {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/issue/${issueId}`);
      router.push("/issues");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      variant="destructive"
      size="lg"
      className="cursor-pointer"
      onClick={handleDelete}
    >
      Delete
    </Button>
  );
}
