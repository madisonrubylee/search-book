import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DetailSearchPopoverProps {
  searchType: string;
  setSearchType: (value: string) => void;
  detailQuery: string;
  setDetailQuery: (value: string) => void;
  handleSearch: () => void;
  searchOptions: Array<{ value: string; label: string }>;
}

export function DetailSearchPopover({
  searchType,
  setSearchType,
  detailQuery,
  setDetailQuery,
  handleSearch,
  searchOptions,
}: DetailSearchPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="px-4 py-2 rounded-lg border border-gray-200 text-text-subtitle text-sm">
          상세검색
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-[360px] mt-2 rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.1)] border-none">
        <div className="flex justify-between items-start p-2">
          <div className="w-full">
            <div className="flex items-center gap-2 pb-2 mb-4">
              <div className="border-b border-palette-border">
                <Select value={searchType} onValueChange={setSearchType}>
                  <SelectTrigger className="w-[90px] text-sm font-semibold border-0 focus:ring-0 focus:outline-none shadow-none">
                    <SelectValue
                      placeholder={
                        searchOptions.find((opt) => opt.value === searchType)
                          ?.label
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {searchOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="border-b border-palette-primary flex-2">
                <Input
                  placeholder="검색어 입력"
                  className="flex-1 text-sm border-0 shadow-none focus-visible:ring-0 focus:outline-none"
                  value={detailQuery}
                  onChange={(e) => setDetailQuery(e.target.value)}
                />
              </div>
            </div>
            <Button
              className="w-full bg-palette-primary"
              onClick={handleSearch}>
              검색하기
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
