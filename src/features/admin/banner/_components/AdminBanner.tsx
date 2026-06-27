import DataTable from "@/components/ui/DataTable";
import { Chip, useDisclosure } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback } from "react";
import TableActions from "@/components/commons/TableActions";
import useBanner from "../_hooks/useBanner";
import { COLUMN_LIST_BANNER } from "@/constant/Banner.constants";
import AddBannerModal from "./AddBannerModal";

const AdminBanner = () => {
  const router = useRouter();
  const addModal = useDisclosure();
  const deleteModal = useDisclosure();
  const {
    dataBanner,
    selectedBanner,
    setSelectedBanner,

    isLoadingBanner,
    isRefetchingBanner,
  } = useBanner();

  const renderCell = useCallback(
    (banner: Record<string, unknown>, columnKey: Key) => {
      const cellValue = banner[columnKey as keyof typeof banner];

      switch (columnKey) {
        case "image":
          return (
            <Image src={`${cellValue}`} alt="icon" width={100} height={200} />
          );
        case "isShow":
          const status = cellValue ? "Show" : "Hide";
          return (
            <Chip
              className="capitalize"
              color={status === "Show" ? "success" : "warning"}
              size="sm"
              variant="flat"
            >
              {status}
            </Chip>
          );
        case "actions":
          const handleDetailButton = () =>
            router.push(`/admin/banners/${banner._id}`);
          const handleDeleteButton = () => {
            setSelectedBanner(banner);
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
    [router, deleteModal, setSelectedBanner],
  );

  return (
    <section>
      {Object.keys(router.query).length > 0 && (
        <DataTable
          renderCell={renderCell}
          columns={COLUMN_LIST_BANNER}
          data={dataBanner?.data || []}
          isLoading={isLoadingBanner || isRefetchingBanner}
          buttonTopContentLabel="Create Banner"
          onClickButtonTop={addModal.onOpen}
          totalPages={dataBanner?.pagination.totalPages}
          emptyContent={"No banners found"}
        />
      )}

      <AddBannerModal {...addModal} />

      {/* <DeleteCategoryModal {...deleteModal} data={selectedCategory} /> */}
    </section>
  );
};

export default AdminBanner;
