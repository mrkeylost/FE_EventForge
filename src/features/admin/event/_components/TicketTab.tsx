import {
  Button,
  Card,
  CardBody,
  CardHeader,
  useDisclosure,
} from "@heroui/react";
import { Key, ReactNode, useCallback } from "react";
import DataTable from "@/components/ui/DataTable";
import TableActions from "@/components/commons/TableActions";
import useTicket from "../_hooks/useTicketTab";
import { COLUMN_LIST_TICKET } from "@/constant/Ticket.constants";
import { convertIDR } from "@/utils/currency";
import { Plus } from "lucide-react";
import AddTicketModal from "./AddTicketModal";
import DeleteTicketModal from "./DeleteTicketModal";
import UpdateTicketModal from "./UpdateTicketModal";

const TicketTab = () => {
  const addModal = useDisclosure();
  const updateModal = useDisclosure();
  const deleteModal = useDisclosure();
  const {
    dataTicket,
    selectedTicket,
    setSelectedTicket,
    isLoadingTicket,
    isRefetchingTicket,
  } = useTicket();

  const renderCell = useCallback(
    (ticket: Record<string, unknown>, columnKey: Key) => {
      const cellValue = ticket[columnKey as keyof typeof ticket];

      switch (columnKey) {
        case "price":
          return `${convertIDR(cellValue as number)}`;
        case "actions":
          const handleDetailButton = () => {
            setSelectedTicket(ticket);
            updateModal.onOpen();
          };
          const handleDeleteButton = () => {
            setSelectedTicket(ticket);
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
    [updateModal, deleteModal, setSelectedTicket],
  );

  return (
    <Card className="w-full p-4">
      <CardHeader className="mb-2 flex items-center justify-between">
        <div className="flex flex-col items-center">
          <h1 className="w-full text-xl font-bold">Event Ticket</h1>
          <p className="text-small text-default-400 w-full">
            Manage ticket of this event
          </p>
        </div>
        <Button
          className="w-full shrink-0 sm:w-auto"
          color="danger"
          startContent={<Plus />}
          onPress={addModal.onOpen}
        >
          Add new Ticket
        </Button>
      </CardHeader>
      <CardBody className="pt-0">
        <DataTable
          renderCell={renderCell}
          showSearchField={false}
          showBottomContent={false}
          columns={COLUMN_LIST_TICKET}
          data={dataTicket || []}
          isLoading={isLoadingTicket || isRefetchingTicket}
          totalPages={1}
          emptyContent={"No tickets found"}
        />
        <AddTicketModal {...addModal} />

        <UpdateTicketModal {...updateModal} data={selectedTicket} />

        <DeleteTicketModal {...deleteModal} data={selectedTicket} />
      </CardBody>
    </Card>
  );
};

export default TicketTab;
