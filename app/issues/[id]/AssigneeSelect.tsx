"use client";
import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Issue, User } from "@/lib/generated/prisma";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const [selectedUserId, setSelectedUserId] = useState(issue.userId || "");
  const { data, isLoading, error } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("/api/user");
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
    staleTime: 60 * 1000, // data is cached till 60 seconds
    retry: 3,
  });
  const handleValueChange = async (userId: string) => {
    try {
      await axios.patch(`/api/issue/${issue.id}`, {
        userId: userId === "unassigned" ? null : userId,
      });
      setSelectedUserId(userId);
    } catch (err) {
      console.error("Failed to update userId", err);
    }
  };
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading users</p>;
  return (
    <Select value={selectedUserId} onValueChange={handleValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="User" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="unassigned">Unassigned</SelectItem>
        {data?.map((user: User) => (
          <SelectItem key={user.id} value={user.id}>
            {user.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default AssigneeSelect;
