"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Issue } from "@/lib/generated/prisma";

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

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: issue?.title,
      description: issue?.description,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      if (issue) {
        await axios.patch(`/api/issue/${issue.id}`, values);
      } else {
        await axios.post("/api/issue", values);
      }

      router.push("/issues");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <div className="mt-4 max-w-2xl mx-auto">
      {false && (
        <div>
          <h2>Error message</h2>
        </div>
      )}
      <Card>
        <CardHeader>
          <CardTitle>Create New Issue</CardTitle>
          <CardDescription>Create new issue</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="title..." {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your title for issue
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Description..." {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your description for issue
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading}>
                {loading ? "Submitting" : "Submit"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default IssueForm;
