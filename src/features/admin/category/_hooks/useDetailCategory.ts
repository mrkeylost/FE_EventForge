import categoryServices from "@/services/category.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ICategory } from "@/types/category";
import { addToast } from "@heroui/react";

const useDetailCategory = () => {
  const { query, isReady } = useRouter();
  const queryClient = useQueryClient();

  /*====================== Get Category By ID =============================*/

  const getCategoryById = async (id: string) => {
    const res = await categoryServices.getCategoryById(id);

    return res.data.data;
  };

  const { data: dataCategory } = useQuery({
    queryKey: ["Category", query.id],
    queryFn: () => getCategoryById(`${query.id}`),
    enabled: isReady,
  });

  /*====================== Update Category =============================*/

  const updateCategory = async (payload: ICategory) => {
    const res = await categoryServices.updateCategory(`${query.id}`, payload);

    return res.data.data;
  };

  const {
    mutate: mutateUpdateCategory,
    isPending: isPendingUpdateCategory,
    isSuccess: isSuccessUpdateCategory,
  } = useMutation({
    mutationFn: (payload: ICategory) => updateCategory(payload),
    onError(err) {
      addToast({
        title: "Update Category Failed",
        description: err.message,
        color: "danger",
      });
    },
    onSuccess: () => {
      addToast({
        title: "Update category success",
        color: "success",
      });

      queryClient.invalidateQueries({ queryKey: ["Category"] });
    },
  });

  const handleUpdateCategory = (data: ICategory) => mutateUpdateCategory(data);

  return {
    dataCategory,

    handleUpdateCategory,
    isPendingUpdateCategory,
    isSuccessUpdateCategory,
  };
};

export default useDetailCategory;
