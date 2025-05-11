"use client";
import React, { useState, useEffect } from "react";
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

const TicketStatusSelect = ({ ticketId }: { ticketId: string }) => {
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const options = [
    { value: "open", label: "Open" },
    { value: "closed", label: "Closed" },
    { value: "in_progress", label: "In Progress" },
  ];

  // Fetch the current status of the ticket
  useEffect(() => {
    const fetchStatus = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/issues/${ticketId}`);
        console.log("Fetched Status:", response.data.status);
        setStatus(response.data.status);
      } catch (error) {
        console.error("Error fetching ticket status:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchStatus();
  }, [ticketId]);

  // Handle status change
  const handleStatusChange = async (selectedStatus: string) => {
    console.log("Selected Status:", selectedStatus);
    setLoading(true);
    try {
      const response = await axios.patch(`/api/issues/${ticketId}`, {
        status: selectedStatus,
      });
      console.log("API Response:", response.data);
      setStatus(selectedStatus);
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
