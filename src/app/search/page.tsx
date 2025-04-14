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
import { SEARCH_CONFIG } from "@/app/types/search";
import { SearchResponse } from "@/app/types/search";
// 컴포넌트 분리
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

  const { data, isLoading } = useSearchBooks({
    query,
    page,
    sort: SEARCH_CONFIG.SORT,
    size: SEARCH_CONFIG.PAGE_SIZE,
  });

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setPage(SEARCH_CONFIG.INITIAL_PAGE);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h2 className="title2 text-title font-medium mb-4">도서 검색</h2>
      <SearchInput onSearch={handleSearch} />
      <SearchResultCount count={data?.meta.total_count || 0} />
      <SearchContent query={query} data={data} isLoading={isLoading} />
    </div>
  );
}
