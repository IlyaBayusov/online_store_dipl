import { useCallback, useState } from "react";
import { IProductCategory, IPagination } from "@/interfaces";
import axios from "axios";
import { sizePage } from "@/constans";

interface UseSearchWithFiltersProps {
  initialPage?: number;
}

interface Filters {
  search?: string;
  colors?: string[];
  brands?: string[];
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
}

interface SearchResponse {
  data: IProductCategory[];
  currentItems: number;
  currentPage: number;
  totalItems: number;
  totalPages: number;
}

export const useSearchWithFilters = ({
  initialPage = 0,
}: UseSearchWithFiltersProps = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<IProductCategory[]>([]);
  const [pagination, setPagination] = useState<IPagination>({
    currentPage: initialPage,
    totalPages: 0,
    totalItems: 0,
    currentItems: 0,
  });
  const [filters, setFilters] = useState<Filters>({
    sort: "id,desc",
  });

  const createSearchParams = useCallback(
    (page: number, currentFilters: Filters, isLoadMore: boolean = false) => {
      const params = new URLSearchParams({
        page: page.toString(),
        size: sizePage.toString(),
        ...(currentFilters.search && { search: currentFilters.search }),
        ...(!isLoadMore &&
          currentFilters.sort && { sort: currentFilters.sort }),
        ...(currentFilters.minPrice && {
          minPrice: currentFilters.minPrice.toString(),
        }),
        ...(currentFilters.maxPrice && {
          maxPrice: currentFilters.maxPrice.toString(),
        }),
      });

      currentFilters.colors?.forEach((color) => params.append("colors", color));
      currentFilters.brands?.forEach((brand) => params.append("brands", brand));

      return params;
    },
    []
  );

  const fetchProducts = useCallback(
    async (
      page: number = pagination.currentPage,
      newFilters?: Filters,
      isLoadMore: boolean = false
    ) => {
      setIsLoading(true);
      setError(null);
      if (page === 0) {
        setProducts([]);
      }

      try {
        const currentFilters = newFilters || filters;
        const params = createSearchParams(page, currentFilters, isLoadMore);

        const response = await axios.get<SearchResponse>(
          `http://localhost:8080/api/v1/products/search?${params.toString()}`
        );

        console.log("Search response:", response.data);

        if (page === 0) {
          setProducts(response.data.data);
        } else {
          setProducts((prev) =>
            prev ? [...prev, ...response.data.data] : response.data.data
          );
        }

        setPagination({
          currentPage: response.data.currentPage,
          totalPages: response.data.totalPages,
          totalItems: response.data.totalItems,
          currentItems: response.data.currentItems,
        });
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Произошла ошибка при загрузке товаров"
        );
      } finally {
        setIsLoading(false);
      }
    },
    [filters, createSearchParams]
  );

  const updateFilters = useCallback((newFilters: Partial<Filters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  const loadMore = useCallback(() => {
    if (pagination.currentPage < pagination.totalPages - 1) {
      fetchProducts(pagination.currentPage + 1, undefined, true);
    }
  }, [pagination.currentPage, pagination.totalPages, fetchProducts]);

  return {
    products,
    isLoading,
    error,
    pagination,
    filters,
    updateFilters,
    loadMore,
    fetchProducts,
  };
};
