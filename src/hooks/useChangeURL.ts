import { useRouter } from "next/router";
import useDebounce from "./useDebounce";
import { DELAY, LIMIT_DEFAULT, PAGE_DEFAULT } from "@/constant/list.constants";
import { ChangeEvent } from "react";
import { GetServerSidePropsContext } from "next";

export const withURLParams = (context: GetServerSidePropsContext) => {
  const { query, resolvedUrl } = context;
  const { limit, page, search } = query;

  if (!limit || !page || search === undefined) {
    const params = new URLSearchParams({
      limit: String(limit || LIMIT_DEFAULT),
      page: String(page || PAGE_DEFAULT),
      search: String(search ?? ""),
    });

    return {
      redirect: {
        destination: `${resolvedUrl.split("?")[0]}?${params.toString()}`,
        permanent: false,
      },
    };
  }

  return null;
};

const useChangeURL = () => {
  const router = useRouter();
  const debounce = useDebounce();

  const currentLimit = router.query.limit;
  const currentPage = router.query.page;
  const currentSearch = router.query.search;

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
