import { User } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";
import { auth } from "~/auth";
import RegisterForm from "~/components/RegisterForm";
// import { db } from "~/server/db";

const Register = async () => {
  const session = await auth();
  if (session) {
    redirect("/");
  }
  return <RegisterForm />;
};

export default Register;
