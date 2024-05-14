"use server";

// import { User } from "@prisma/client";
// import { redirect } from "next/navigation";
// import { redirect } from "next/dist/server/api-utils";
import { signIn } from "~/auth";
import { db } from "~/server/db";

export async function doLogin(formData: FormData) {
  //   const action = formData.get("action");
  //   console.log("Action", action);
  // await signIn(action,{redirectTo:'/home'})
  await signIn("credentials", {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
}
export const createUser = async (user: FormData) => {
  try {
    await db.user.create({
      data: {
        username: user.get("userName") as string,
        email: user.get("email") as string,
        password: user.get("password") as string,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
