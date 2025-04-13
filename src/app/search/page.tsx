import { SearchInput, SearchResultCount, SearchList } from "./components";

export default function SearchPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="title2 text-title font-medium mb-4">도서 검색</h2>
      <SearchInput />
      <SearchResultCount />
      <SearchList books={[]} />
    </div>
  );
}
