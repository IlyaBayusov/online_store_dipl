import { useCallback, useState } from "react";
import { IProductCategory, IPagination } from "@/interfaces";
import axios from "axios";

interface UseSearchWithFiltersProps {
  initialPage?: number;
  pageSize?: number;
}

interface SortOption {
  value: string;
  label: string;
}

export const sortOptions: SortOption[] = [
  { value: "id,desc", label: "Более новые" },
  { value: "id,asc", label: "Более старые" },
  { value: "price,desc", label: "По цене, убывание" },
  { value: "price,asc", label: "По цене, возрастание" },
];

interface Filters {
  search?: string;
  colors?: string[];
  brands?: string[];
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
}

interface SearchResponse {
  products: IProductCategory[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

export const useSearchWithFilters = ({
  initialPage = 0,
  pageSize = 10,
}: UseSearchWithFiltersProps = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<IProductCategory[]>([]);
  const [pagination, setPagination] = useState<IPagination>({
    currentPage: initialPage,
    totalPages: 0,
    totalItems: 0,
    pageSize,
  });
  const [filters, setFilters] = useState<Filters>({
    sort: "id,desc",
  });

  const createSearchParams = useCallback(
    (page: number, currentFilters: Filters) => {
      const params = new URLSearchParams({
        page: page.toString(),
        size: pageSize.toString(),
        ...(currentFilters.search && { search: currentFilters.search }),
        ...(currentFilters.sort && { sort: currentFilters.sort }),
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
    [pageSize]
  );

  const fetchProducts = useCallback(
    async (page: number = pagination.currentPage, newFilters?: Filters) => {
      setIsLoading(true);
      setError(null);
      if (page === 0) {
        setProducts([]);
      }

      try {
        const currentFilters = newFilters || filters;
        const params = createSearchParams(page, currentFilters);

        const response = await axios.get<SearchResponse>(
          `http://localhost:8080/api/v1/products/search?${params.toString()}`
        );

        if (page === 0) {
          setProducts(response.data.products);
        } else {
          setProducts((prev) => [...prev, ...response.data.products]);
        }

        setPagination({
          currentPage: response.data.currentPage,
          totalPages: response.data.totalPages,
          totalItems: response.data.totalItems,
          pageSize,
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
    [pageSize, filters, createSearchParams]
  );

  const updateFilters = useCallback((newFilters: Partial<Filters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  const loadMore = useCallback(() => {
    if (pagination.currentPage < pagination.totalPages - 1) {
      fetchProducts(pagination.currentPage + 1);
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
