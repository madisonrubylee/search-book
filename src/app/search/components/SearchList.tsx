"use client";

import { useState, useCallback } from "react";
import { Book } from "@/types";
import Image from "next/image";
import { CollapsedBookItem, ExpandedBookItem } from "./index";
import { toast } from "sonner";
import { useLikedBooks } from "@/hooks/useLikedBooks";

interface SearchListProps {
  books: Book[];
  onLikedBooksChange?: (newLikedBooks: Book[]) => void;
}

export default function SearchList({
  books,
  onLikedBooksChange,
}: SearchListProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const { likedBooks, updateLikedBooks } = useLikedBooks();

  const toggleLike = useCallback(
    (isbn: string) => {
      const book = books.find((b) => b.isbn === isbn);
      if (!book) return;

      const isCurrentlyLiked = likedBooks.some((b) => b.isbn === isbn);
      const newLikedBooks = isCurrentlyLiked
        ? likedBooks.filter((b) => b.isbn !== isbn)
        : [...likedBooks, book];

      updateLikedBooks(newLikedBooks);
      onLikedBooksChange?.(newLikedBooks);

      toast(
        isCurrentlyLiked
          ? "내가 찜한 책에서 제외되었습니다."
          : "내가 찜한 책에 추가되었습니다.",
        {
          duration: 1500,
        }
      );
    },
    [books, likedBooks, updateLikedBooks, onLikedBooksChange]
  );

  if (books.length === 0) {
    return (
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
  }

  return (
    <div>
      {books.map((book) => (
        <div key={book.isbn} className="border-b border-gray-200">
          <div
            className={`transform-gpu transition-all duration-500 ease-in-out`}>
            {expandedItem === book.isbn ? (
              <div className="animate-fadeIn">
                <ExpandedBookItem
                  book={book}
                  isLiked={likedBooks.some((b) => b.isbn === book.isbn)}
                  onToggleLike={toggleLike}
                  onCollapse={() => setExpandedItem(null)}
                />
              </div>
            ) : (
              <div className="animate-fadeIn">
                <CollapsedBookItem
                  book={book}
                  isLiked={likedBooks.some((b) => b.isbn === book.isbn)}
                  onToggleLike={toggleLike}
                  onExpand={() => setExpandedItem(book.isbn)}
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
