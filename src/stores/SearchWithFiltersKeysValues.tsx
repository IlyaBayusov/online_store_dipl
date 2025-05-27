import {
  filtersKeyModalNav,
  filtersKeyProductsPage,
  filtersUpDown,
} from "@/constans";
import { IFiltersUpDown, IPagination } from "@/interfaces";

export const isLoadingDefaultValue = {
  [filtersKeyProductsPage]: true,
  [filtersKeyModalNav]: true,
};

export const isFetchDefaultValue = {
  [filtersKeyProductsPage]: false,
  [filtersKeyModalNav]: false,
};

export const productsDefaultValue = {
  [filtersKeyProductsPage]: [],
  [filtersKeyModalNav]: [],
};
export const paginationDefaultValue = {
  [filtersKeyProductsPage]: {} as IPagination,
  [filtersKeyModalNav]: {} as IPagination,
};

export const sortsFieldDefaultValue = {
  [filtersKeyProductsPage]: { ...filtersUpDown[0] } as IFiltersUpDown,
  [filtersKeyModalNav]: { ...filtersUpDown[0] } as IFiltersUpDown,
};

export const searchPDefaultValue = {
  [filtersKeyProductsPage]: "",
  [filtersKeyModalNav]: "",
};

export const categorIdDefaultValue = {
  [filtersKeyProductsPage]: null,
  [filtersKeyModalNav]: null,
};

export const typeStoreDefaultValue = {
  [filtersKeyProductsPage]: "",
  [filtersKeyModalNav]: "",
};
