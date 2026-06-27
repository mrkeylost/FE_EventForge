import useChangeURL from "@/hooks/useChangeURL";
import bannerServices from "@/services/banner.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useBanner = () => {
  const router = useRouter();

  const [selectedBanner, setSelectedBanner] = useState<Record<
    string,
    unknown
  > | null>(null);

  const { currentPage, currentLimit, currentSearch } = useChangeURL();

  const getBanners = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }

    const res = await bannerServices.getBanners(params);
    return res.data;
  };

  const {
    data: dataBanner,
    isLoading: isLoadingBanner,
    isRefetching: isRefetchingBanner,
  } = useQuery({
    queryKey: ["Banner", currentPage, currentLimit, currentSearch],
    queryFn: () => getBanners(),
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

  return {
    dataBanner,
    selectedBanner,
    setSelectedBanner,

    isLoadingBanner,
    isRefetchingBanner,
  };
};

export default useBanner;
