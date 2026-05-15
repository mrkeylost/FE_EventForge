import { useRouter } from "next/router";
import useDebounce from "./useDebounce";
import { DELAY, LIMIT_DEFAULT, PAGE_DEFAULT } from "@/constant/list.constants";
import { ChangeEvent, useEffect } from "react";

const useChangeURL = () => {
  const router = useRouter();
  const debounce = useDebounce();

  const currentLimit = router.query.limit;
  const currentPage = router.query.page;
  const currentSearch = router.query.search;

  useEffect(() => {
    const setUrl = () => {
      router.replace({
        query: {
          limit: currentLimit || LIMIT_DEFAULT,
          page: currentPage || PAGE_DEFAULT,
          search: currentSearch || "",
        },
      });
    };

    if (!router.isReady) return;

    const { limit, page, search } = router.query;

    if (!limit || !page || search === undefined) {
      setUrl();
    }
  }, [router, currentLimit, currentPage, currentSearch]);

  const handleChangePage = (page: number) => {
    router.push({
      query: {
        ...router.query,
        page,
      },
    });
  };

  const handleChangeLimit = (e: ChangeEvent<HTMLSelectElement>) => {
    router.push({
      query: {
        ...router.query,
        page: PAGE_DEFAULT,
        limit: e.target.value,
      },
    });
  };

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    debounce(() => {
      router.push({
        query: {
          ...router.query,
          page: PAGE_DEFAULT,
          search: e.target.value,
        },
      });
    }, DELAY);
  };

  const handleClearSearch = () => {
    router.push({
      query: {
        ...router.query,
        page: PAGE_DEFAULT,
        search: "",
      },
    });
  };

  return {
    currentPage,
    currentLimit,
    currentSearch,
    handleChangePage,
    handleChangeLimit,
    handleChangeSearch,
    handleClearSearch,
  };
};

export default useChangeURL;
