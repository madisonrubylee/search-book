import Image from "next/image";
import { Book } from "@/types";

interface ExpandedBookItemProps {
  book: Book;
  isLiked: boolean;
  onToggleLike: (isbn: string) => void;
  onCollapse: () => void;
}

export default function ExpandedBookItem({
  book,
  isLiked,
  onToggleLike,
  onCollapse,
}: ExpandedBookItemProps) {
  console.log("book", book);
  return (
    <div className="flex gap-4 flex-col sm:flex-row py-5">
      <div className="relative w-full sm:w-[210px] h-[280px] flex-shrink-0">
        <Image
          src={book.thumbnail || "/static/images/book.png"}
          alt={book.title}
          fill
          sizes="(max-width: 640px) 100vw, 210px"
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
          className="absolute top-2 right-2 z-10 cursor-pointer">
          <Image
            src={
              isLiked ? "/static/images/fill.png" : "/static/images/line.png"
            }
            alt="like"
            width={24}
            height={24}
          />
        </button>
      </div>

      <div className="flex flex-col sm:flex-row justify-between flex-1">
        <div className="flex flex-col flex-1 max-w-full sm:max-w-[600px] space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
            <h3 className="H3-bold w-full sm:w-auto truncate">{book.title}</h3>
            <p className="caption-medium text-text-subtitle w-full sm:w-auto truncate">
              {book.authors}
            </p>
          </div>
          <p className="body2-bold text-text-primary">책 소개</p>
          <div className="space-y-2">
            <span
              className="small text-text-primary"
              dangerouslySetInnerHTML={{
                __html: book.contents,
              }}
            />
          </div>
        </div>

        <div className="flex flex-col justify-start sm:justify-between gap-2 items-center sm:items-end w-full sm:w-auto">
          <button
            onClick={onCollapse}
            className="w-full sm:w-[115px] h-[48px] px-4 bg-palette-light-gray text-text-secondary rounded-[8px] flex items-center justify-center gap-2">
            <>
              상세보기
              <Image
                src="/static/images/arrow-up.png"
                alt="상세보기"
                width={12}
                height={12}
                style={{ width: "auto", height: "auto" }}
              />
            </>
          </button>
          <div className="flex flex-col gap-3 w-full sm:w-auto items-center sm:items-end">
            {book.sale_price === -1 ? (
              <div className="flex flex-row gap-2 items-center">
                <p className="tiny-medium text-text-subtitle ">판매가</p>
                <span className="font-[17px] font-weight-[350] text-text-primary line-through">
                  {book.price.toLocaleString()}원
                </span>
              </div>
            ) : (
              <div className="flex flex-col  gap-2 mb-2 items-end">
                {book.price && (
                  <div className="flex flex-row gap-2 items-center">
                    <p className="tiny-medium text-text-subtitle ">원가</p>
                    <span className="font-[17px] font-weight-[350] text-text-primary line-through">
                      {book.price.toLocaleString()}원
                    </span>
                  </div>
                )}
                {book.sale_price && (
                  <div className="flex flex-row gap-2 items-center">
                    <p className="tiny-medium text-text-subtitle">판매가</p>
                    <span className="H3-bold text-text-primary">
                      {book.sale_price.toLocaleString()}원
                    </span>
                  </div>
                )}
              </div>
            )}

            <button className="w-full sm:w-[240px] h-[40px] sm:h-[48px] px-2 sm:px-4 py-2 bg-palette-primary caption text-palette-white rounded-[8px]">
              구매하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
