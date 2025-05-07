"use client";
import React from "react";
import { Button, buttonVariants } from "../ui/button";
import { signOut, useSession } from "@/lib/auth-client";

import { useRouter } from "next/navigation";
import Link from "next/link";

const SignOut = () => {
  const router = useRouter();
  const { data: session } = useSession();
  return (
    <>
      {session?.session ? (
        <div className="flex items-center gap-4">
          <Button variant="outline">{session.user.name}</Button>
          <Button
            className="cursor-pointer"
            onClick={async () => {
              await signOut({
                fetchOptions: {
                  onSuccess: () => {
                    router.push("/signin"); // redirect to login page
                  },
                },
              });
            }}
          >
            Signout
          </Button>
        </div>
      ) : (
        <Link className={buttonVariants()} href="/signin">
          Login
        </Link>
      )}
    </>
  );
};

export default SignOut;
