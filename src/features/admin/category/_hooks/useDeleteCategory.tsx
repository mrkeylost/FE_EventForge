import categoryServices from "@/services/category.service";
import { addToast } from "@heroui/react";
import { useMutation } from "@tanstack/react-query";

const useDeleteCategoryModal = () => {
  const deleteCategory = async (id: string) => {
    const res = await categoryServices.deleteCategory(id);

    return res;
  };

  const {
    mutate: mutateDeleteCategory,
    isPending: isPendingDeleteCategory,
    isSuccess: isSuccessDeleteCategory,
  } = useMutation({
    mutationFn: deleteCategory,
    onError(err) {
      addToast({
        title: "Delete Category Failed",
        description: err.message,
        color: "danger",
      });
    },
    onSuccess: () => {
      addToast({
        title: "Delete Category Success",
        color: "success",
      });
    },
  });

  const handleDeleteCategory = (id: string) => mutateDeleteCategory(id);

  return {
    handleDeleteCategory,
    isPendingDeleteCategory,
    isSuccessDeleteCategory,
  };
};

export default useDeleteCategoryModal;
