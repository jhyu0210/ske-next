import { signOut } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { auth } from "~/auth";
import { Button, buttonVariants } from "~/components/ui/button";

const DashboardPage = async () => {
  const session = await auth();
  const user = session?.user;

  if (!session) redirect("/api/auth/signin");
  return (
    <div>
      <h1>Dashboard</h1>
      <p>{user?.email}</p>
      <Link
        className={buttonVariants({ variant: "outline" })}
        href="/api/auth/signout"
      >
        Logout
      </Link>
    </div>
  );
};

export default DashboardPage;
