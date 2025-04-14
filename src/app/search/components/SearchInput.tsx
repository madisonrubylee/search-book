"use client";

import { SearchIcon } from "@/assets/icons";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface SearchInputProps {
  onSearch: (query: string) => void;
}

export default function SearchInput({ onSearch }: SearchInputProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2 mb-4">
        <div className="flex-1 relative">
          <Input
            type="text"
            placeholder="검색어를 입력하세요"
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-[100px] h-12 pl-10 pr-4 bg-palette-light-gray border border-gray-200"
          />
          <div className="absolute left-2 top-[45%] -translate-y-1/2 flex items-center pointer-events-none">
            <SearchIcon className="w-7 h-7 text-gray-600" />
          </div>
        </div>
        <button
          type="submit"
          className="px-4 py-2 rounded-lg border border-gray-200 text-sm">
          상세검색
        </button>
      </div>
    </form>
  );
}
