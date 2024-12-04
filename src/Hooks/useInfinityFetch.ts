import { useInfiniteQuery } from "react-query";
import { useRef, useCallback } from "react";
import fetchCall from "../Utils/apiFetch";
import { CommunityType, TravelPlanType, ReviewType } from "../type/types";

interface FetchType {
  endpoint: string;
  filters: Record<string, string>;
}

export type ItemType = CommunityType | TravelPlanType | ReviewType;

export const useInfiniteFetch = ({ endpoint, filters }: FetchType) => {
  const fetchPostList = async ({ pageParam = 0 }) => {
    const params = new URLSearchParams(filters).toString();
    const response = await fetchCall<{
      data: {
        data: {
          totalPages: number;
          content?: ItemType[];
          reviews?: ItemType[];
        };
      };
    }>(`${endpoint}?page=${pageParam}&${params}`, "get");
    return {
      totalPages: response.data.data.totalPages,
      lists: response.data.data.content || response.data.data.reviews,
    };
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: [endpoint, filters],
    queryFn: fetchPostList,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length;
      return nextPage < lastPage.totalPages ? nextPage : undefined;
    },
    keepPreviousData: true,
  });

  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading || !hasNextPage) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting) {
            fetchNextPage();
          }
        },
        { threshold: 0.8 },
      );

      if (node) observer.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isLoading],
  );

  return {
    data: data?.pages.flatMap(page => page.lists) || [],
    isLoading,
    isError,
    error,
    lastElementRef,
    isFetchingNextPage,
  };
};
