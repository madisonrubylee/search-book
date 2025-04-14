import { Book } from "@/types/book";
import { useQuery } from "@tanstack/react-query";

interface SearchParams {
  query: string;
  sort?: "accuracy" | "latest";
  page?: number;
  size?: number;
  target?: "title" | "isbn" | "publisher" | "person";
}

export async function searchBooks(
  query: string,
  page: number = 1,
  size: number = 10
) {
  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_KAKAO_API_BASE_URL
    }/search/book?query=${encodeURIComponent(query)}&page=${page}&size=${size}`,
    {
      headers: {
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_API_KEY}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("책 검색에 실패했습니다");
  }

  return response.json() as Promise<BookSearchResponse>;
}

interface BookSearchResponse {
  meta: {
    total_count: number;
    pageable_count: number;
    is_end: boolean;
  };
  documents: Book[];
}

export function useSearchBooks({
  query,
  sort = "accuracy",
  page = 1,
  size = 10,
  target,
}: SearchParams) {
  return useQuery({
    queryKey: ["books", query, sort, page, size, target],
    queryFn: async () => {
      const params = new URLSearchParams({
        query,
        sort,
        page: page.toString(),
        size: size.toString(),
        ...(target && { target }),
      });

      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_KAKAO_API_BASE_URL
        }/search/book?${params.toString()}`,
        {
          headers: {
            Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_API_KEY}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("API 요청 실패");
      }
      return response.json();
    },
    enabled: query !== "",
  });
}
