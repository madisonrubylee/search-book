"use client";

import { useState } from "react";
import {
  SearchInput,
  SearchResultCount,
  SearchList,
  SearchListSkeleton,
} from "./components";
import { useSearchBooks } from "./api/searchBooks";
import Image from "next/image";
import { SEARCH_CONFIG } from "@/types/search";
import { SearchResponse } from "@/types/search";
import { useSearchHistory } from "@/hooks/useSearchHistory";

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-20">
    <div className="w-16 h-16 bg-[#B7E4E7] rounded-full flex items-center justify-center mb-3">
      <Image
        src="/static/images/icon_book.png"
        alt="icon_book"
        width={32}
        height={32}
      />
    </div>
    <p className="text-sm text-gray-600">검색된 결과가 없습니다.</p>
  </div>
);

interface SearchContentProps {
  query: string;
  data: SearchResponse;
  isLoading: boolean;
}
// 검색 결과 컨텐츠 컴포넌트
const SearchContent = ({ query, data, isLoading }: SearchContentProps) => {
  if (query === "") return <EmptyState />;
  if (isLoading) return <SearchListSkeleton />;
  return <SearchList books={data?.documents || []} />;
};

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(SEARCH_CONFIG.INITIAL_PAGE);
  const [searchFilters, setSearchFilters] = useState({
    sort: "accuracy",
    target: "title",
  });

  const { searchHistory, addToHistory, removeFromHistory } = useSearchHistory();

  const { data, isLoading } = useSearchBooks({
    query,
    page,
    sort: searchFilters.sort,
    target: searchFilters.target,
    size: SEARCH_CONFIG.PAGE_SIZE,
  });

  const handleSearch = (searchQuery: string, filters?: SearchFilters) => {
    setQuery(searchQuery);
    setPage(SEARCH_CONFIG.INITIAL_PAGE);
    if (filters) {
      setSearchFilters(filters);
    }
    addToHistory(searchQuery);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h2 className="title2 text-title font-medium mb-4">도서 검색</h2>
      <SearchInput
        value={query}
        onChange={setQuery}
        onSearch={handleSearch}
        searchHistory={searchHistory}
        onRemoveHistory={removeFromHistory}
      />
      <SearchResultCount
        count={data?.meta.total_count || 0}
        label="도서 검색 결과"
      />
      <SearchContent query={query} data={data} isLoading={isLoading} />
    </div>
  );
}
