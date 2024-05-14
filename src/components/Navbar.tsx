// import Link from "next/link";
// import MaxWidthWrapper from "./MaxWidthWrapper";
// import { buttonVariants } from "./ui/button";
// // import {
// //   LoginLink,
// //   RegisterLink,
// //   getKindeServerSession,
// // } from "@kinde-oss/kinde-auth-nextjs/server";
// import { ArrowRight } from "lucide-react";
// import UserAccountNav from "./UserAccountNav";
// import MobileNav from "./MobileNav";
// import { auth } from "~/auth";

// const Navbar = async () => {
//   const session = await auth();
//   const user = session?.user;
//   return (
//     <nav className="sticky inset-x-0 top-0 z-30 h-14 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
//       <MaxWidthWrapper>
//         <div className="flex h-14 items-center justify-between border-b border-zinc-200">
//           <Link href="/" className="z-40 flex font-semibold">
//             <span>quill.</span>
//           </Link>

//           <MobileNav isAuth={!!user} />

//           <div className="hidden items-center space-x-4 sm:flex">
//             {!user ? (
//               <>
//                 <Link
//                   href="/pricing"
//                   className={buttonVariants({
//                     variant: "ghost",
//                     size: "sm",
//                   })}
//                 >
//                   Pricing
//                 </Link>
//                 <Link
//                   href="#"
//                   className={buttonVariants({
//                     variant: "ghost",
//                     size: "sm",
//                   })}
//                 >
//                   Sign in
//                 </Link>
//                 <Link
//                   href="#"
//                   className={buttonVariants({
//                     size: "sm",
//                   })}
//                 >
//                   Get started <ArrowRight className="ml-1.5 h-5 w-5" />
//                 </Link>
//               </>
//             ) : (
//               <>
//                 <Link
//                   href="/dashboard"
//                   className={buttonVariants({
//                     variant: "ghost",
//                     size: "sm",
//                   })}
//                 >
//                   Dashboard
//                 </Link>

//                 <UserAccountNav
//                   name={!user.name ? "Your Account" : user.name}
//                   email={user.email ?? ""}
//                   imageUrl={user.picture ?? ""}
//                 />
//               </>
//             )}
//           </div>
//         </div>
//       </MaxWidthWrapper>
//     </nav>
//   );
// };

// export default Navbar;
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { auth } from "~/auth";
// import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

const Navbar = async () => {
  // const { getUser } = getKindeServerSession()
  // const user = await getUser()
  const session = await auth();
  const user = session?.user;
  const isAdmin = user?.email === process.env.ADMIN_EMAIL;

  return (
    <nav className="sticky inset-x-0 top-0 z-[100] h-14 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="z-40 flex font-semibold">
            case<span className="text-green-600">cobra</span>
          </Link>

          <div className="flex h-full items-center space-x-4">
            {user ? (
              <>
                <Link
                  href="/api/auth/signout"
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  Sign out
                </Link>
                {isAdmin ? (
                  <Link
                    href="/dashboard"
                    className={buttonVariants({
                      size: "sm",
                      variant: "ghost",
                    })}
                  >
                    Dashboard ✨
                  </Link>
                ) : null}
                <Link
                  href="/configure/upload"
                  className={buttonVariants({
                    size: "sm",
                    className: "hidden items-center gap-1 sm:flex",
                  })}
                >
                  Create case
                  <ArrowRight className="ml-1.5 h-5 w-5" />
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/register"
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  Sign up
                </Link>

                <Link
                  href="/api/auth/signin"
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  Login
                </Link>

                <div className="hidden h-8 w-px bg-zinc-200 sm:block" />

                <Link
                  href="/configure/upload"
                  className={buttonVariants({
                    size: "sm",
                    className: "hidden items-center gap-1 sm:flex",
                  })}
                >
                  Create case
                  <ArrowRight className="ml-1.5 h-5 w-5" />
                </Link>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
