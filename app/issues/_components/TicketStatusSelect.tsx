"use client";

import React, { useState } from "react";
import {
  Select,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import axios from "axios";
import { SelectGroup } from "@radix-ui/react-select";
import { useRouter } from "next/navigation";
const TicketStatusSelect = ({ ticketId }: { ticketId: string }) => {
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const router = useRouter();
  // Match Prisma enum values exactly
  const options = [
    { value: "OPEN", label: "Open" },
    { value: "IN_PROGRESS", label: "In Progress" },
    { value: "CLOSED", label: "Closed" },
  ];

  //   // Fetch the current status of the ticket
  //   useEffect(() => {
  //     const fetchStatus = async () => {
  //       setLoading(true);
  //       try {
  //         const response = await axios.get(`/api/issue/${ticketId}`);
  //         setStatus(response.data.status);
  //       } catch (error) {
  //         console.error("Error fetching ticket status:", error);
  //         setError(error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
  //     fetchStatus();
  //   }, [ticketId]);

  // Handle status change
  const handleStatusChange = async (selectedStatus: string) => {
    setLoading(true);
    try {
      await axios.patch(`/api/issue/${ticketId}`, {
        status: selectedStatus,
      });
      setStatus(selectedStatus);
      router.push(`/issues/${ticketId}`);
    } catch (error) {
      console.error("Error updating ticket status:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Select value={status} onValueChange={handleStatusChange}>
      <SelectTrigger>
        <SelectValue
          placeholder={
            loading
              ? "Loading..."
              : status
              ? options.find((o) => o.value === status)?.label
              : "Select a status"
          }
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Statuses</SelectLabel>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default TicketStatusSelect;
