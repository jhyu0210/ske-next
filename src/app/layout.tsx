import "~/styles/globals.css";

import { Inter, Recursive } from "next/font/google";
import { Toaster } from "sonner";
import Navbar from "~/components/Navbar";
import Provider from "~/components/Provider";
// import { Provider } from "@radix-ui/react-toast";

const recursive = Recursive({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Case Cobra",
  description: "Phone case design",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* <body className={`font-sans ${recursive.variable}`}> */}
      <body className={recursive.className}>
        <Navbar />
        <main className="grainy-light flex min-h-[calc(100vh-3.5rem-1px)] flex-col">
          <div className="flex h-full flex-1 flex-col">
            <Provider>{children}</Provider>
          </div>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
