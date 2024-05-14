"use server";
import { User } from "next-auth";

import bcrypt from "bcrypt";
import { db } from "~/server/db";

type LoginFn = (email: string, password: string) => Promise<User>;

export const login: LoginFn = async (email, password) => {
  console.log("Loggin in user email", email);
  console.log("Loggin in user password", password);
  const user = await db.user.findFirst({
    where: {
      email: email,
    },
  });
  if (!user) throw new Error("User Not exist in db!");

  const passwordCorrect = await bcrypt.compare(password, user?.password);

  console.log("found from db user :", user);
  //   if (user && (await compare(password, user.password))) {
  if (passwordCorrect) {
    user.password = "";
    return user;
  } else throw new Error("User Not Found!");
};
