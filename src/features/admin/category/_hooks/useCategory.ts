import useChangeURL from "@/hooks/useChangeURL";
import categoryServices from "@/services/category.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useCategory = () => {
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState<Record<
    string,
    unknown
  > | null>(null);

  const { currentPage, currentLimit, currentSearch } = useChangeURL();

  const getCategories = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }

    const res = await categoryServices.getCategories(params);
    return res.data;
  };

  const {
    data: dataCategory,
    isLoading: isLoadingCategory,
    isRefetching: isRefetchingCategory,
  } = useQuery({
    queryKey: ["Category", currentPage, currentLimit, currentSearch],
    queryFn: () => getCategories(),
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

  return {
    dataCategory,
    selectedCategory,
    setSelectedCategory,

    isLoadingCategory,
    isRefetchingCategory,
  };
};

export default useCategory;
