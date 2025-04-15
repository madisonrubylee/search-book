import Image from "next/image";
import { Book } from "@/types";

interface CollapsedBookItemProps {
  book: Book;
  isLiked: boolean;
  onToggleLike: (isbn: string) => void;
  onExpand: () => void;
}

export function CollapsedBookItem({
  book,
  isLiked,
  onToggleLike,
  onExpand,
}: CollapsedBookItemProps) {
  return (
    <div className="flex p-4 gap-4 flex-row">
      <div className="relative w-[48px] h-[68px] flex-shrink-0">
        <Image
          src={book.thumbnail || "/static/images/book.png"}
          alt={book.title}
          fill
          quality={100}
          className="object-contain"
          onError={(e) => {
            e.currentTarget.src = "/static/images/book.png";
          }}
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleLike(book.isbn);
          }}
          className="absolute top-1 right-1 z-10 cursor-pointer">
          <Image
            src={
              isLiked ? "/static/images/fill.png" : "/static/images/line.png"
            }
            alt="like"
            width={16}
            height={16}
          />
        </button>
      </div>

      <div className="flex flex-col flex-2 sm:flex-row justify-between  items-start sm:items-center gap-2 sm:gap-0">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-3 flex-1 max-w-full sm:max-w-[550px]">
          <h3 className="H3-bold sm:truncate w-full sm:w-auto max-w-[600px] line-clamp-2 sm:line-clamp-1">
            {book.title}
          </h3>
          <p className="caption-medium text-text-subtitle truncate w-full sm:w-auto">
            {book.authors}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
          <span className="title3 text-primary whitespace-nowrap">
            {book.sale_price === -1
              ? book.price.toLocaleString()
              : book.sale_price.toLocaleString()}
            원
          </span>
          <div className="flex gap-2 w-full">
            <button className="w-full sm:w-[115px] h-[48px] px-4 py-2 bg-palette-primary caption text-palette-white rounded-[8px]">
              구매하기
            </button>
            <button
              onClick={onExpand}
              className="w-full sm:w-[115px] h-[48px] px-4 bg-palette-light-gray text-text-secondary rounded-[8px] flex items-center justify-center gap-2">
              <>
                상세보기
                <Image
                  src="/static/images/arrow-down.png"
                  alt="상세보기"
                  width={12}
                  height={12}
                />
              </>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
