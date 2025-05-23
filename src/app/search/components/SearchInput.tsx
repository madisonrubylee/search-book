"use client";

import { SearchIcon } from "@/assets/icons";
import { Input } from "@/components/ui/input";
import { useState, useRef, useEffect } from "react";
import { SearchHistoryList } from "./SearchHistoryList";
import { DetailSearchPopover } from "./DetailSearchPopover";
import { DETAIL_SEARCH_OPTIONS } from "@/constants";

interface SearchInputProps {
  onSearch: (query: string, type?: string) => void;
  searchHistory: string[];
  onRemoveHistory: (item: string) => void;
}

export default function SearchInput({
  onSearch,
  searchHistory,
  onRemoveHistory,
}: SearchInputProps) {
  const [query, setQuery] = useState("");
  const [detailQuery, setDetailQuery] = useState("");
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const inputRef = useRef<HTMLFormElement>(null);
  const [searchType, setSearchType] = useState("title");

  const handleSearch = () => {
    if (detailQuery.trim()) {
      onSearch(detailQuery, searchType);
      setQuery(detailQuery);
      setDetailQuery("");
    }
  };

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
            } placeholder:text-text-subtitle placeholder:caption`}
          />
          <div className="absolute left-2 top-[45%] -translate-y-1/2 flex items-center pointer-events-none">
            <SearchIcon className="w-7 h-7 text-palette-black" />
          </div>
          {isHistoryVisible && searchHistory.length > 0 && (
            <SearchHistoryList
              searchHistory={searchHistory}
              onItemClick={handleHistoryItemClick}
              onRemoveItem={onRemoveHistory}
            />
          )}
        </div>

        <DetailSearchPopover
          searchType={searchType}
          setSearchType={setSearchType}
          detailQuery={detailQuery}
          setDetailQuery={setDetailQuery}
          handleSearch={handleSearch}
          searchOptions={DETAIL_SEARCH_OPTIONS}
        />
      </div>
    </form>
  );
}
