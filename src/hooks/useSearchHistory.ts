import { useState, useEffect } from "react";
import { MAX_SEARCH_HISTORY_ITEMS } from "@/constants";
export function useSearchHistory() {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem("searchHistory");
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  const addToHistory = (searchQuery: string) => {
    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) return;

    const newHistory = [
      trimmedQuery,
      ...searchHistory.filter((item) => item !== trimmedQuery),
    ].slice(0, MAX_SEARCH_HISTORY_ITEMS);

    setSearchHistory(newHistory);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));
  };

  const removeFromHistory = (itemToRemove: string) => {
    const newHistory = searchHistory.filter((item) => item !== itemToRemove);
    setSearchHistory(newHistory);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));
  };

  return {
    searchHistory,
    addToHistory,
    removeFromHistory,
  };
}
