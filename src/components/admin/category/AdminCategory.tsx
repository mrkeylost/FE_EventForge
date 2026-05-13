import DataTable from "@/components/ui/DataTable";
import { Button, Tooltip } from "@heroui/react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LIST_CATEGORY } from "./Category.constants";
import useCategory from "@/hooks/category/useCategory";
import InputFile from "@/components/ui/InputFile";

const AdminCategory = () => {
  const router = useRouter();
  const {
    setUrl,
    currentPage,
    currentLimit,
    handleChangePage,
    handleChangeLimit,
    handleChangeSearch,
    handleClearSearch,
    dataCategory,
    isLoadingCategory,
    isRefetchingCategory,
  } = useCategory();

  useEffect(() => {
    if (!router.isReady) return;

    const { limit, page, search } = router.query;

    if (!limit || !page || search === undefined) {
      setUrl();
    }
  }, [router.isReady, router.query, setUrl]);

  const renderCell = useCallback(
    (category: Record<string, unknown>, columnKey: Key) => {
      const cellValue = category[columnKey as keyof typeof category];

      switch (columnKey) {
        // case "icon":
        //   return (
        //     <Image src={`${cellValue}`} alt="icon" width={100} height={200} />
        //   );
        case "actions":
          return (
            <div className="flex items-center justify-center gap-1">
              <Tooltip content="View Category">
                <Button
                  key="detail-category-button"
                  isIconOnly
                  variant="light"
                  size="sm"
                  aria-label="View category"
                  onPress={() => router.push(`/admin/category/${category._id}`)}
                >
                  <Eye size={16} />
                </Button>
              </Tooltip>
              <Tooltip content="Edit category">
                <Button
                  key="edit-category-button"
                  isIconOnly
                  variant="light"
                  size="sm"
                  aria-label="Edit category"
                >
                  <Pencil size={16} />
                </Button>
              </Tooltip>
              <Tooltip color="danger" content="Delete category">
                <Button
                  key="delete-category-button"
                  isIconOnly
                  variant="light"
                  size="sm"
                  color="danger"
                  aria-label="Delete category"
                >
                  <Trash2 size={16} />
                </Button>
              </Tooltip>
            </div>
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [router],
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
          onClickButtonTop={() => {}}
          currentPage={Number(currentPage)}
          totalPages={dataCategory?.pagination.totalPages}
          limit={String(currentLimit)}
          onChangeLimit={handleChangeLimit}
          onChangePage={handleChangePage}
          onClear={handleClearSearch}
          onSearchChange={handleChangeSearch}
          emptyContent={"No categories found"}
        />
      )}

      <InputFile name={"name"} isDropable />
    </section>
  );
};

export default AdminCategory;
