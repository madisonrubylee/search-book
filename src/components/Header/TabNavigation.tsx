"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface Tab {
  value: string;
  label: string;
  href: string;
}

interface TabNavigationProps {
  tabs: Tab[];
}

export default function TabNavigation({ tabs }: TabNavigationProps) {
  const pathname = usePathname();

  return (
    <Tabs value={pathname.split("/")[1] || "search"} className="w-fit">
      <TabsList className="border-0 bg-transparent p-0 h-auto gap-4 sm:gap-8">
        {tabs.map((tab) => (
          <Link key={tab.value} href={tab.href} className="focus:outline-none">
            <TabsTrigger
              value={tab.value}
              className="body1 relative px-1 pb-2 text-[var(--text-primary)]
                        data-[state=active]:shadow-none
                        after:absolute after:inset-x-0 after:bottom-0 after:h-[1px] 
                        after:bg-transparent data-[state=active]:after:bg-palette-primary 
                        after:transition-colors cursor-pointer
                        text-sm sm:text-base">
              {tab.label}
            </TabsTrigger>
          </Link>
        ))}
      </TabsList>
    </Tabs>
  );
}
