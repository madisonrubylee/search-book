"use client";

import Image from "next/image";
import {
  SearchList,
  SearchListSkeleton,
  SearchResultCount,
} from "@/app/search/components";
import { useLikedBooks } from "@/hooks/useLikedBooks";

export default function FavoritesPage() {
  const { likedBooks, updateLikedBooks, isLoading } = useLikedBooks();

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h2 className="title2 text-title font-medium mb-4">내가 찜한 책</h2>
        <SearchResultCount count={likedBooks.length} label="찜한 책" />
      </div>
      {isLoading ? (
        <SearchListSkeleton />
      ) : likedBooks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 bg-[#B7E4E7] rounded-full flex items-center justify-center mb-3">
            <Image
              src="/static/images/icon_book.png"
              alt="icon_book"
              width={32}
              height={32}
            />
          </div>
          <p className="text-sm text-gray-600">찜한 책이 없습니다.</p>
        </div>
      ) : (
        <SearchList books={likedBooks} onLikedBooksChange={updateLikedBooks} />
      )}
    </div>
  );
}
