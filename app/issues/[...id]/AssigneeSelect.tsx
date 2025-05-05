"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const AssigneeSelect = () => {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="User" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Light</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default AssigneeSelect;
