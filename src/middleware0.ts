// import { NextResponse } from "next/server";
// import { BASE_PATH, auth } from "./auth";
// import { type NextAuthRequest } from "node_modules/next-auth/lib";

// // export const config = {
// //   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// // };

// export const config = {
//   matcher: ["/test-route"],
// };

// export default auth((req: NextAuthRequest) => {
//   const reqUrl = new URL(req.url);
//   if (!req.auth && reqUrl?.pathname !== "/") {
//     return NextResponse.redirect(
//       new URL(
//         `${BASE_PATH}/signin?callbackUrl=${encodeURIComponent(
//           reqUrl?.pathname,
//         )}`,
//         req.url,
//       ),
//     );
//   }
// });
