"use client";

interface SearchResultCountProps {
  count: number;
}

export default function SearchResultCount({ count }: SearchResultCountProps) {
  return (
    <div className="mb-8">
      <p className="text-sm text-gray-600">
        도서 검색 결과
        <span className="text-gray-900">
          총 <span className="text-palette-primary">{count}</span>건
        </span>
      </p>
    </div>
  );
}
