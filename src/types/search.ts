export const SEARCH_CONFIG = {
  INITIAL_PAGE: 1,
  PAGE_SIZE: 10,
  SORT: "accuracy",
} as const;

export type SearchSort = "accuracy" | "latest";
export type SearchTarget = "title" | "isbn" | "publisher" | "person";
export interface SearchFilters {
  sort: SearchSort;
  target: SearchTarget;
}

export interface SearchParams {
  query: string;
  sort?: SearchSort;
  page?: number;
  size?: number;
  target?: SearchTarget;
}

export interface Book {
  title: string;
  contents: string;
  url: string;
  isbn: string;
  datetime: string;
  authors: string[];
  publisher: string;
  translators: string[];
  price: number;
  sale_price: number;
  thumbnail: string;
  status: string;
}

export interface SearchResponse {
  documents: Book[];
  meta: {
    total_count: number;
    pageable_count: number;
    is_end: boolean;
  };
}
