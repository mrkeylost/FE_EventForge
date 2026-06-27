import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { addToast } from "@heroui/react";
import bannerServices from "@/services/banner.service";
import { IBanner } from "@/types/banner";

const useDetailBanner = () => {
  const { query, isReady } = useRouter();
  const queryClient = useQueryClient();

  /*====================== Get Banner By ID =============================*/

  const getBannerById = async (id: string) => {
    const res = await bannerServices.getBannerById(id);

    return res.data.data;
  };

  const { data: dataBanner } = useQuery({
    queryKey: ["Banner", query.id],
    queryFn: () => getBannerById(`${query.id}`),
    enabled: isReady,
  });

  /*====================== Update Banner =============================*/

  const updateBanner = async (payload: IBanner) => {
    const res = await bannerServices.updateBanner(`${query.id}`, payload);

    return res.data.data;
  };

  const {
    mutate: mutateUpdateBanner,
    isPending: isPendingUpdateBanner,
    isSuccess: isSuccessUpdateBanner,
  } = useMutation({
    mutationFn: (payload: IBanner) => updateBanner(payload),
    onError(err) {
      addToast({
        title: "Update Banner Failed",
        description: err.message,
        color: "danger",
      });
    },
    onSuccess: () => {
      addToast({
        title: "Update Banner success",
        color: "success",
      });

      queryClient.invalidateQueries({ queryKey: ["Banner"] });
    },
  });

  const handleUpdateBanner = (data: IBanner) => {
    const payload = {
      ...data,
      isShow: data.isShow === "true",
    };

    mutateUpdateBanner(payload);
  };

  return {
    dataBanner,

    handleUpdateBanner,
    isPendingUpdateBanner,
    isSuccessUpdateBanner,
  };
};

export default useDetailBanner;
