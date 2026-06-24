import { Chip, useDisclosure } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback } from "react";
import useEvent from "../_hooks/useEvent";
import DataTable from "@/components/ui/DataTable";
import { COLUMN_LIST_EVENT } from "@/constant/Event.constants";
import TableActions from "@/components/commons/TableActions";
import AddEventModal from "./AddEventModal";
import DeleteEventModal from "./DeleteEventModal";

const AdminEvent = () => {
  const router = useRouter();
  const addModal = useDisclosure();
  const deleteModal = useDisclosure();
  const {
    dataEvent,
    selectedEvent,
    setSelectedEvent,
    isLoadingEvent,
    isRefetchingEvent,
  } = useEvent();

  const renderCell = useCallback(
    (event: Record<string, unknown>, columnKey: Key) => {
      const cellValue = event[columnKey as keyof typeof event];

      switch (columnKey) {
        case "banner":
          return (
            <Image
              src={`${cellValue}`}
              alt="banner"
              width={200}
              height={100}
              className="aspect-video w-36 rounded-lg object-cover"
            />
          );
        case "isPublish":
          const status = cellValue ? "Published" : "Draft";
          return (
            <Chip
              className="capitalize"
              color={status === "Published" ? "success" : "warning"}
              size="sm"
              variant="flat"
            >
              {status}
            </Chip>
          );
        case "actions":
          const handleDetailButton = () =>
            router.push(`/admin/event/${event._id}`);
          const handleDeleteButton = () => {
            setSelectedEvent(event);
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
    [router, deleteModal, setSelectedEvent],
  );

  return (
    <section>
      {Object.keys(router.query).length > 0 && (
        <DataTable
          renderCell={renderCell}
          columns={COLUMN_LIST_EVENT}
          data={dataEvent?.data || []}
          isLoading={isLoadingEvent || isRefetchingEvent}
          buttonTopContentLabel="Create Event"
          onClickButtonTop={addModal.onOpen}
          totalPages={dataEvent?.pagination.totalPages}
          emptyContent={"No events found"}
        />
      )}

      <AddEventModal {...addModal} />

      <DeleteEventModal {...deleteModal} data={selectedEvent} />
    </section>
  );
};

export default AdminEvent;
