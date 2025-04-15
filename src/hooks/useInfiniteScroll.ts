import { useCallback, useEffect, useRef } from "react";

export const useInfiniteScroll = (
  onIntersect: () => void,
  deps: { isLoading: boolean; isEnd: boolean; query: string }
) => {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (
        entries[0].isIntersecting &&
        !deps.isLoading &&
        !deps.isEnd &&
        deps.query !== ""
      ) {
        onIntersect();
      }
    },
    [deps.isLoading, deps.isEnd, deps.query, onIntersect]
  );

  useEffect(() => {
    const currentRef = loadMoreRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: "100px",
      threshold: 0,
    });

    observer.observe(currentRef);
    return () => observer.disconnect();
  }, [handleIntersect]);

  return loadMoreRef;
};
