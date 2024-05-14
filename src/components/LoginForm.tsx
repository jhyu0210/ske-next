// "use client";

// import { useRef } from "react";
// import { Input } from "./ui/input";
// import { Button } from "./ui/button";
// import Link from "next/link";
// import { signIn } from "next-auth/react";
// import { login } from "~/auth/auth";
// import email from "next-auth/providers/email";

// const LoginForm = () => {
//   const emailRef = useRef("");
//   const passRef = useRef("");

//   const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     // await login(email.current, pass.current);
//     console.log("Email, password", emailRef.current, passRef.current);
//   };

//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         {/* <Input type="text" placeholder="Enter Your Name" /> */}
//         <input type="email" placeholder="Enter Your Email" name="email" />
//         <Input type="password" placeholder="Password" name="pass" id="pass" />
//         <div className="mt-2 flex items-center justify-center gap-2">
//           <Button type="submit" className="w-28">
//             Login
//           </Button>
//           <Link
//             href={"/"}
//             className="w-28 rounded-md border border-red-600 py-2 text-center text-red-600 transition hover:border-transparent hover:bg-red-600 hover:text-white active:scale-95"
//           >
//             Cancel
//           </Link>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default LoginForm;
"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { toast } from "sonner";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "This field has to be filled.",
    })
    .email("This is not a valid email")
    .max(300, {
      message: "Password can't be longer than 300 characters.",
    }),
  password: z
    .string()
    .min(6, { message: "Password has to be at least 6 characters long." }),
});

const LoginForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Submitting values::: ", values);
    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirectTo: "/",
    });

    if (!response?.error) {
      router.push("/");
    }

    toast.success("You are now signed in!");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <h1 className="text-2xl font-semibold">Login</h1>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="johndoe@whatever.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Link className="block" href={"/register"}>
          Don't have an account?
        </Link>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default LoginForm;
