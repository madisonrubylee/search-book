import { CloseIcon } from "@/assets/icons";

interface SearchHistoryListProps {
  searchHistory: string[];
  onItemClick: (item: string) => void;
  onRemoveItem: (item: string) => void;
}

export function SearchHistoryList({
  searchHistory,
  onItemClick,
  onRemoveItem,
}: SearchHistoryListProps) {
  return (
    <div className="absolute top-full left-0 right-0 mt-0  border-t-0 rounded-b-[24px] z-10 bg-palette-light-gray px-5 pb-3">
      {searchHistory.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between px-4 py-2 cursor-pointer"
          onClick={() => onItemClick(item)}>
          <span className="caption text-text-subtitle">{item}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemoveItem(item);
            }}
            className="text-gray-400 hover:text-gray-600">
            <CloseIcon className="w-[16px] h-[16px] text-palette-black" />
          </button>
        </div>
      ))}
    </div>
  );
}
