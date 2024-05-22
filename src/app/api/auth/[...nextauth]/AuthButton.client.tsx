// "use client";
// import { Button } from "~/components/ui/button";
// import { useSession } from "next-auth/react";
// import { signIn, signOut } from "~/auth/helpers";
// function AuthButtonClient() {
//   const session = useSession();
//   return session?.data?.user ? (
//     <Button
//       className="rounded-lg border border-slate-200"
//       variant="ghost"
//       onClick={async () => {
//         await signOut();
//         await signIn();
//       }}
//     >
//       {session?.data?.user.name}:Sign Out
//     </Button>
//   ) : (
//     <Button
//       className="rounded-lg border border-slate-200"
//       variant="ghost"
//       onClick={async () => await signIn()}
//     >
//       Sign In
//     </Button>
//   );
// }

// export default AuthButtonClient;
