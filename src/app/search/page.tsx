"use client";

import { useState, useRef, useEffect, useCallback } from "react";
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

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [books, setBooks] = useState<Book[]>([]);
  const [isEnd, setIsEnd] = useState(false);
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    sort: "accuracy",
    target: "title",
  });

  const { searchHistory, addToHistory, removeFromHistory } = useSearchHistory();

  const loadMoreRef = useRef<HTMLDivElement>(null);

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

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && !isLoading && !isEnd && query !== "") {
        setPage((prev) => prev + 1);
      }
    },
    [isLoading, isEnd, query]
  );

  useEffect(() => {
    if (books.length === 0 || isLoading) return;

    const currentRef = loadMoreRef.current;
    if (!currentRef) {
      console.log("loadMoreRef가 없음 - books:", books.length);
      return;
    }

    console.log("Observer 새로 설정:", {
      booksLength: books.length,
      isLoading,
      isEnd,
      page,
      hasRef: !!currentRef,
    });

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: "100px",
      threshold: 0,
    });

    observer.observe(currentRef);

    return () => {
      observer.disconnect();
    };
  }, [books.length, handleIntersect, isLoading]);

  useEffect(() => {
    console.log("데이터 상태:", {
      booksLength: books.length,
      isLoading,
      isEnd,
      page,
      query,
    });
  }, [books.length, isLoading, isEnd, page, query]);

  const handleSearch = (searchQuery: string, type?: string) => {
    setQuery(searchQuery);
    if (type) {
      setSearchFilters((prev) => ({ ...prev, target: type as SearchTarget }));
    }
    addToHistory(searchQuery);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h2 className="title2 text-title font-medium mb-4">도서 검색</h2>
      <SearchInput
        onSearch={handleSearch}
        searchHistory={searchHistory}
        onRemoveHistory={removeFromHistory}
      />
      <SearchResultCount
        count={data?.meta.total_count || 0}
        label="도서 검색 결과"
      />
      {query === "" || books.length === 0 ? (
        <EmptyState />
      ) : isLoading && page === 1 ? (
        <SearchListSkeleton />
      ) : (
        <div className="relative">
          <SearchList books={books} />
          <div
            ref={loadMoreRef}
            className="h-20 flex items-center justify-center mt-4 bg-gray-50 border-t border-gray-200"></div>
        </div>
      )}
    </div>
  );
}
