import { Toaster } from "react-hot-toast";
import Chat from "../components/chat";
import { default as QueryClientProvider } from "../components/providers";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ask AI",
  description: "The Best Platform for Coding Interviews!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <QueryClientProvider>
        <body className={inter.className}>
          <Toaster/>
          <Chat />
          {children}
        </body>
      </QueryClientProvider>
    </html>
  );
}
