"use client";

import { useState, useEffect } from "react";
import {
  SearchInput,
  SearchResultCount,
  SearchList,
  SearchListSkeleton,
} from "./components";
import { useSearchBooks } from "./api/searchBooks";
import Image from "next/image";
import { SEARCH_CONFIG, SearchFilters, SearchTarget } from "@/types/search";
import { Book } from "@/types/book";
import { useSearchHistory } from "@/hooks/useSearchHistory";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { debounce } from "lodash";

const HasNoResult = () => (
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

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [books, setBooks] = useState<Book[]>([]);
  const [isEnd, setIsEnd] = useState(false);
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    sort: "accuracy",
    target: "title",
  });
  const [showTopButton, setShowTopButton] = useState(false);

  const { searchHistory, addToHistory, removeFromHistory } = useSearchHistory();

  const { data, isLoading } = useSearchBooks({
    query,
    page,
    sort: searchFilters.sort,
    target: searchFilters.target,
    size: SEARCH_CONFIG.PAGE_SIZE,
  });

  useEffect(() => {
    if (data) {
      if (page === 1) {
        setBooks(data.documents);
      } else {
        setBooks((prev) => [...prev, ...data.documents]);
      }
      setIsEnd(data.meta.is_end);
    }
  }, [data, page]);

  useEffect(() => {
    setPage(1);
    setBooks([]);
    setIsEnd(false);
  }, [query, searchFilters.sort, searchFilters.target]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowTopButton(true);
      } else {
        setShowTopButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const loadMoreRef = useInfiniteScroll(() => setPage((prev) => prev + 1), {
    isLoading,
    isEnd,
    query,
  });

  const handleSearch = (searchQuery: string, type?: string) => {
    setQuery(searchQuery);
    if (type) {
      setSearchFilters((prev) => ({ ...prev, target: type as SearchTarget }));
    }
    addToHistory(searchQuery);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const debouncedHandleSearch = debounce((query: string) => {
    handleSearch(query);
  }, 300);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h2 className="title2 text-title font-medium mb-4">도서 검색</h2>
      <SearchInput
        onSearch={debouncedHandleSearch}
        searchHistory={searchHistory}
        onRemoveHistory={removeFromHistory}
      />
      <SearchResultCount
        count={data?.meta.total_count || 0}
        label="도서 검색 결과"
      />
      {query === "" || books.length === 0 ? (
        <HasNoResult />
      ) : isLoading && page === 1 ? (
        <SearchListSkeleton />
      ) : (
        <div className="relative">
          <SearchList books={books} />
          <div
            ref={loadMoreRef}
            className="h-20 flex items-center justify-center mt-4 bg-gray-50 border-t border-gray-200"
          />
        </div>
      )}

      {showTopButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-palette-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300"
          aria-label="페이지 상단으로 이동">
          <Image
            src="/static/images/arrow-up.png"
            alt="위로 이동"
            width={24}
            height={24}
          />
        </button>
      )}
    </div>
  );
}
