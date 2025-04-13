import { ReactNode } from "react";
import "./globals.css";
import { TabNavigation } from "@/components/Header";

export default function RootLayout({ children }: { children: ReactNode }) {
  const tabs = [
    {
      value: "search",
      label: "도서 검색",
      href: "/search",
    },
    {
      value: "my-books",
      label: "내가 찜한 책",
      href: "/my-books",
    },
  ];

  return (
    <html lang="ko">
      <body>
        <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200">
          <nav className="max-w-7xl mx-auto px-4 py-3 sm:py-0 sm:h-16 flex items-center justify-between">
            <h1 className="title1 text-lg sm:text-2xl leading-tight sm:leading-normal">
              CERTICOS
              <br className="sm:hidden" /> BOOKS
            </h1>
            <TabNavigation tabs={tabs} />
          </nav>
        </header>
        <main className="pt-16 min-h-screen">{children}</main>
      </body>
    </html>
  );
}
