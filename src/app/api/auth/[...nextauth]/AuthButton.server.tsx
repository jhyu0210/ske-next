// import { SessionProvider } from "next-auth/react";
// import React from "react";
// import { BASE_PATH, auth } from "~/auth";
// import AuthButtonClient from "./AuthButton.client";

// const AuthButtonServer = async () => {
//   const session = await auth();
//   if (session && session.user) {
//     session.user = {
//       name: session.user.name,
//       email: session.user.email,
//     };
//   }
//   return (
//     <SessionProvider basePath={BASE_PATH} session={session}>
//       <AuthButtonClient />
//     </SessionProvider>
//   );
// };

// export default AuthButtonServer;
