"use client";

import Image from "next/image";

// 임시 타입 정의
interface Book {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  originalPrice?: number;
  category: string;
}

interface SearchListProps {
  books: Book[];
}

export function SearchList({ books }: SearchListProps) {
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
    <div className="space-y-4">
      {books.map((book) => (
        <div
          key={book.id}
          className="flex gap-4 p-4 border border-gray-200 rounded-lg">
          <div className="w-24 h-32 relative flex-shrink-0">
            <Image
              src={book.imageUrl}
              alt={book.title}
              fill
              className="object-cover rounded-md"
            />
          </div>

          <div className="flex-1">
            <h3 className="font-medium mb-2">{book.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{book.category}</p>
            <div className="flex items-center gap-2">
              {book.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  {book.originalPrice.toLocaleString()}원
                </span>
              )}
              <span className="font-medium">
                {book.price.toLocaleString()}원
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm">
              구매하기
            </button>
            <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm">
              상세보기
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
