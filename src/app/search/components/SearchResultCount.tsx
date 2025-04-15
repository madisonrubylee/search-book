"use client";

interface SearchResultCountProps {
  count: number;
  label: string;
}

export default function SearchResultCount({
  count,
  label,
}: SearchResultCountProps) {
  return (
    <div className="mb-8">
      <p className="text-sm text-gray-600">
        {label}
        <span className="text-gray-900 ml-2">
          총 <span className="text-palette-primary">{count}</span>건
        </span>
      </p>
    </div>
  );
}
