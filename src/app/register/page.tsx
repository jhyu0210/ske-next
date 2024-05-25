import { redirect } from "next/navigation";
import React from "react";
import { auth } from "~/auth";
import MaxWidthWrapper from "~/components/MaxWidthWrapper";
import RegisterForm from "~/components/RegisterForm";
// import { db } from "~/server/db";

const Register = async () => {
  const session = await auth();
  if (session) {
    redirect("/");
  }
  return (
    <MaxWidthWrapper>
      <RegisterForm />
    </MaxWidthWrapper>
  );
};

export default Register;
