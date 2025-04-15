"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { SearchList, SearchResultCount } from "../search/components";
import { Book } from "../types/search";

export default function FavoritesPage() {
  const [likedBooks, setLikedBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedBooks = localStorage.getItem("likedBooks");
    if (savedBooks) {
      const books = JSON.parse(savedBooks);
      const uniqueBooks = books.filter(
        (book: Book, index: number, self: Book[]) =>
          index === self.findIndex((b) => b.isbn === book.isbn)
      );
      setLikedBooks(uniqueBooks);
    }
    setIsLoading(false);
  }, []);

  const handleLikedBooksChange = (newLikedBooks: Book[]) => {
    setLikedBooks(newLikedBooks);
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h2 className="title2 text-title font-medium mb-4">내가 찜한 책</h2>
        <SearchResultCount count={likedBooks.length} label="찜한 책" />
      </div>

      {likedBooks.length === 0 ? (
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
        <SearchList
          books={likedBooks}
          onLikedBooksChange={handleLikedBooksChange}
        />
      )}
    </div>
  );
}
