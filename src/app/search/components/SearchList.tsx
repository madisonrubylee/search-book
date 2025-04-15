"use client";

import { useEffect, useState } from "react";
import { Book } from "@/types";
import Image from "next/image";
import { CollapsedBookItem } from "./CollapsedBookItem";
import { ExpandedBookItem } from "./ExpandedBookItem";

interface SearchListProps {
  books: Book[];
  onLikedBooksChange?: (newLikedBooks: Book[]) => void;
}

export default function SearchList({
  books,
  onLikedBooksChange,
}: SearchListProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [likedBooks, setLikedBooks] = useState<Book[]>([]);

  // TODO: 전역 상태관리 ?
  useEffect(() => {
    const saved = localStorage.getItem("likedBooks");
    if (saved) {
      setLikedBooks(JSON.parse(saved));
    }
  }, []);

  const toggleLike = (isbn: string) => {
    const book = books.find((b) => b.isbn === isbn);
    if (!book) return;

    const newLikedBooks = likedBooks.some((b) => b.isbn === isbn)
      ? likedBooks.filter((b) => b.isbn !== isbn)
      : [...likedBooks, book];

    setLikedBooks(newLikedBooks);
    localStorage.setItem("likedBooks", JSON.stringify(newLikedBooks));
    onLikedBooksChange?.(newLikedBooks);
  };

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
