import { useState, useEffect } from "react";
import { Book } from "@/types";

export function useLikedBooks() {
  const [likedBooks, setLikedBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      const saved = localStorage.getItem("likedBooks");
      if (saved) {
        const books = JSON.parse(saved);
        const uniqueBooks = books.filter(
          (book: Book, index: number, self: Book[]) =>
            index === self.findIndex((b) => b.isbn === book.isbn)
        );
        setLikedBooks(uniqueBooks);
      }
      setIsLoading(false);
    };

    loadBooks();
  }, []);

  const updateLikedBooks = (newLikedBooks: Book[]) => {
    setLikedBooks(newLikedBooks);
    localStorage.setItem("likedBooks", JSON.stringify(newLikedBooks));
  };

  return { likedBooks, updateLikedBooks, isLoading };
}
