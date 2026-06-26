import DataTable from "@/components/ui/DataTable";
import { useDisclosure } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LIST_CATEGORY } from "../../../../constant/Category.constants";
import useCategory from "@/features/admin/category/_hooks/useCategory";
import AddCategoryModal from "./AddCategoryModal";
import DeleteCategoryModal from "./DeleteCategoryModal";
import TableActions from "@/components/commons/TableActions";
import useChangeURL from "@/hooks/useChangeURL";

const AdminCategory = () => {
  const router = useRouter();
  const addModal = useDisclosure();
  const deleteModal = useDisclosure();
  const { setUrl } = useChangeURL();
  const {
    dataCategory,
    selectedCategory,
    setSelectedCategory,
    isLoadingCategory,
    isRefetchingCategory,
  } = useCategory();

  useEffect(() => {
    if (router.isReady) setUrl();
  }, [setUrl, router.isReady]);

  const renderCell = useCallback(
    (category: Record<string, unknown>, columnKey: Key) => {
      const cellValue = category[columnKey as keyof typeof category];

      switch (columnKey) {
        case "icon":
          return (
            <Image src={`${cellValue}`} alt="icon" width={100} height={200} />
          );
        case "actions":
          const handleDetailButton = () =>
            router.push(`/admin/category/${category._id}`);
          const handleDeleteButton = () => {
            setSelectedCategory(category);
            deleteModal.onOpen();
          };

          return (
            <TableActions
              onPressButtonDetail={handleDetailButton}
              onPressButtonDelete={handleDeleteButton}
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [router, deleteModal, setSelectedCategory],
  );

  return (
    <section>
      {Object.keys(router.query).length > 0 && (
        <DataTable
          renderCell={renderCell}
          columns={COLUMN_LIST_CATEGORY}
          data={dataCategory?.data || []}
          isLoading={isLoadingCategory || isRefetchingCategory}
          buttonTopContentLabel="Create Category"
          onClickButtonTop={addModal.onOpen}
          totalPages={dataCategory?.pagination.totalPages}
          emptyContent={"No categories found"}
        />
      )}

      <AddCategoryModal {...addModal} />

      <DeleteCategoryModal {...deleteModal} data={selectedCategory} />
    </section>
  );
};

export default AdminCategory;
