"use client";

import { SearchIcon } from "@/assets/icons";
import { Input } from "@/components/ui/input";
import { useState, useRef, useEffect } from "react";
import { useSearchHistory } from "@/hooks/useSearchHistory";
import { SearchHistoryList } from "./SearchHistoryList";

interface SearchInputProps {
  onSearch: (query: string) => void;
}

export default function SearchInput({ onSearch }: SearchInputProps) {
  const [query, setQuery] = useState("");
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const { searchHistory, addToHistory, removeFromHistory } = useSearchHistory();
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsHistoryVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      addToHistory(query);
      setIsHistoryVisible(false);
    }
  };

  const handleHistoryItemClick = (item: string) => {
    setQuery(item);
    onSearch(item);
    setIsHistoryVisible(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 relative" ref={inputRef}>
      <div className="flex gap-2 mb-4">
        <div className="flex-1 relative">
          <Input
            type="text"
            value={query}
            placeholder="검색어를 입력하세요"
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsHistoryVisible(true)}
            className={`caption w-full h-12 pl-10 pr-4 bg-palette-light-gray border-0 focus-visible:ring-0 ${
              isHistoryVisible && searchHistory.length > 0
                ? "rounded-t-[24px] rounded-b-none"
                : "rounded-[100px]"
            }  placeholder:text-text-subtitle placeholder:caption`}
          />
          <div className="absolute left-2 top-[45%] -translate-y-1/2 flex items-center pointer-events-none">
            <SearchIcon className="w-7 h-7 text-palette-black" />
          </div>
          {isHistoryVisible && searchHistory.length > 0 && (
            <SearchHistoryList
              searchHistory={searchHistory}
              onItemClick={handleHistoryItemClick}
              onRemoveItem={removeFromHistory}
            />
          )}
        </div>

        <button
          type="submit"
          className="px-4 py-2 rounded-lg border border-gray-200 text-text-subtitle text-sm">
          상세검색
        </button>
      </div>
    </form>
  );
}
