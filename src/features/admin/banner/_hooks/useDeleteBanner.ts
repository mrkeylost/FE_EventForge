import bannerServices from "@/services/banner.service";
import { addToast } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";

const useDeleteBannerModal = () => {
  const deleteBanner = async (id: string) => {
    const res = await bannerServices.deleteBanner(id);

    return res;
  };

  const {
    mutate: mutateDeleteBanner,
    isPending: isPendingDeleteBanner,
    isSuccess: isSuccessDeleteBanner,
  } = useMutation({
    mutationFn: deleteBanner,
    onError(err) {
      addToast({
        title: "Delete Banner Failed",
        description: err.message,
        color: "danger",
      });
    },
    onSuccess: () => {
      addToast({
        title: "Delete Banner Success",
        color: "success",
      });
    },
  });

  const handleDeleteBanner = (id: string) => mutateDeleteBanner(id);

  return {
    handleDeleteBanner,
    isPendingDeleteBanner,
    isSuccessDeleteBanner,
  };
};

export default useDeleteBannerModal;
