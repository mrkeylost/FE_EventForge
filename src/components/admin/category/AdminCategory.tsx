import DataTable from "@/components/ui/DataTable";
import { Button, Tooltip } from "@heroui/react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback } from "react";
import { COLUMN_LIST_CATEGORY } from "./Category.constants";
import { LIMIT_LISTS } from "@/constant/commons/list.constants";

const AdminCategory = () => {
  const router = useRouter();

  const renderCell = useCallback(
    (category: Record<string, unknown>, columnKey: Key) => {
      const cellValue = category[columnKey as keyof typeof category];

      switch (columnKey) {
        case "icon":
          return (
            <Image src={`${cellValue}`} alt="icon" width={100} height={200} />
          );
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
      <DataTable
        renderCell={renderCell}
        columns={COLUMN_LIST_CATEGORY}
        data={[
          {
            _id: "111",
            name: "Category 1",
            description: "Description 1",
            icon: "/images/category/icon-exhibition.jpg",
          },
          {
            _id: "112",
            name: "Category 2",
            description: "Description 2",
            icon: "/images/category/icon-festival.jpg",
          },
        ]}
        buttonTopContentLabel="Create Category"
        onClickButtonTop={() => {}}
        currentPage={1}
        totalPages={10}
        limit={LIMIT_LISTS[0].label}
        onChangeLimit={() => {}}
        onChangePage={() => {}}
        onClear={() => {}}
        onSearchChange={() => {}}
        emptyContent={"No categories found"}
      />
    </section>
  );
};

export default AdminCategory;
