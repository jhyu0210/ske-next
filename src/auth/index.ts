import NextAuth, { User, NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
// import bcrypt from "bcrypt";
// import email from "next-auth/providers/email";
// import { db } from "~/server/db";
import { login } from "./auth";

export const BASE_PATH = "/api/auth";

const authOptions: NextAuthConfig = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@email.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // let user=null
        const pw = credentials.password as string;
        const em = credentials.email as string;
        console.log("Email in authorize fn::", em);
        if (!pw || !em) return null;
        try {
          const user = await login(em, pw);
          console.log("db login user::::", user);
          return user;
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token
        token.id = user?.id
      }
      return token
    },
    session({ session, token }) {
        // I skipped the line below coz it gave me a TypeError
        // session.accessToken = token.accessToken;
        session.user.id = token.id;
  
        return session;
      },
  },
  // callbacks:{
  //   session: async ({ session, token }) => {
  //     if (session?.user) {
  //       session.user.id = token.sub;
  //     }
  //     return session;
  //   },
  //   jwt: async ({ user, token }) => {
  //     if (user) {
  //       token.uid = user.id;
  //     }
  //     return token;
  //   },
  // },
  session:{
    strategy:'jwt'
  },
  basePath: BASE_PATH,
  secret: "process.env.NEXTAUTH_SECRET",
  pages: {
    signIn: "/login", //default "/signin"
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
