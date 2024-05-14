// import clientPromise from "@/lib/MongodbClient";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db } from "~/server/db";

export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json();

    // const bcrypt = require("bcrypt");

    const hashedPassword = await bcrypt.hash(password, 10);

    // const client = await clientPromise;
    // const db = client.db();

    const createAccount = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
      },
    });

    return NextResponse.json({ success: "Account created" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
