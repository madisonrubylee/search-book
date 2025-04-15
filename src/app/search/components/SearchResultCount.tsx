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
    <div className="mb-8 text-text-primary">
      <p className="caption">
        {label}
        <span className=" ml-2">
          총 <span className="text-palette-primary">{count}</span>건
        </span>
      </p>
    </div>
  );
}
