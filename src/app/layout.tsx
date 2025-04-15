"use client";

import { ReactNode } from "react";
import "./globals.css";
import { TabNavigation } from "@/components/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  const tabs = [
    {
      value: "search",
      label: "도서 검색",
      href: "/search",
    },
    {
      value: "favorites",
      label: "내가 찜한 책",
      href: "/favorites",
    },
  ];

  return (
    <html lang="ko">
      <body>
        <QueryClientProvider client={queryClient}>
          <header className="fixed z-10 top-0 left-0 right-0 bg-white border-b border-gray-200">
            <nav className="max-w-7xl mx-auto px-4 py-3 sm:py-0 sm:h-16 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0 sm:justify-between">
              <h1 className="text-lg sm:text-2xl font-bold">CERTICOS BOOKS</h1>
              <TabNavigation tabs={tabs} />
            </nav>
          </header>
          <main className="pt-24 sm:pt-20 min-h-screen">{children}</main>
        </QueryClientProvider>
      </body>
    </html>
  );
}
