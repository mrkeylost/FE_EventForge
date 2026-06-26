import { LIMIT_LISTS } from "@/constant/list.constants";
import useChangeURL from "@/hooks/useChangeURL";
import { cn } from "@/utils/cn";
import {
  Button,
  Input,
  Pagination,
  Select,
  SelectItem,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { Plus, Search } from "lucide-react";
import { Key, ReactNode, useMemo } from "react";

interface PropTypes {
  columns: Record<string, unknown>[];
  data: Record<string, unknown>[];
  totalPages: number;
  showSearchField?: boolean;
  showBottomContent?: boolean;
  buttonTopContentLabel?: string;
  onClickButtonTop?: () => void;
  renderCell: (item: Record<string, unknown>, columnKey: Key) => ReactNode;
  emptyContent: string;
  isLoading?: boolean;
}

const DataTable = (props: PropTypes) => {
  const {
    columns,
    data,
    totalPages,
    showSearchField = true,
    showBottomContent = true,
    buttonTopContentLabel,
    onClickButtonTop,
    renderCell,
    emptyContent,
    isLoading,
  } = props;

  const {
    currentPage,
    currentLimit,
    handleChangePage,
    handleChangeLimit,
    handleChangeSearch,
    handleClearSearch,
  } = useChangeURL();

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        {showSearchField && (
          <Input
            isClearable
            className="w-full sm:w-64"
            placeholder="Search by name..."
            startContent={<Search />}
            onClear={handleClearSearch}
            onChange={handleChangeSearch}
          />
        )}
        {buttonTopContentLabel && (
          <Button
            className="w-full shrink-0 sm:w-auto"
            color="danger"
            startContent={<Plus />}
            onPress={onClickButtonTop}
          >
            {buttonTopContentLabel}
          </Button>
        )}
      </div>
    );
  }, [
    showSearchField,
    buttonTopContentLabel,
    onClickButtonTop,
    handleChangeSearch,
    handleClearSearch,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="flex items-center justify-center sm:justify-between">
        {showBottomContent && (
          <Select
            disallowEmptySelection
            className="hidden max-w-36 md:block"
            size="md"
            selectedKeys={[String(currentLimit)]}
            selectionMode="single"
            startContent={<p className="text-small">Show: </p>}
            onChange={handleChangeLimit}
          >
            {LIMIT_LISTS.map((item) => (
              <SelectItem key={item.value}>{item.label}</SelectItem>
            ))}
          </Select>
        )}

        {totalPages > 1 && (
          <Pagination
            showControls
            isCompact
            classNames={{
              cursor: "bg-foreground text-background",
            }}
            color="danger"
            page={Number(currentPage)}
            total={totalPages}
            onChange={handleChangePage}
            loop
          />
        )}
      </div>
    );
  }, [
    showBottomContent,
    currentLimit,
    currentPage,
    totalPages,
    handleChangeLimit,
    handleChangePage,
  ]);

  return (
    <Table
      topContent={topContent}
      topContentPlacement="outside"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        base: "max-w-full",
        wrapper: cn({ "overflow-x-hidden": isLoading }),
        loadingWrapper: "backdrop-blur-sm bg-background/30 z-10",
      }}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid as Key}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable as boolean}
          >
            {column.name as string}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        emptyContent={emptyContent}
        items={data}
        isLoading={isLoading}
        loadingContent={<Spinner variant="gradient" color="danger" />}
      >
        {(item) => (
          <TableRow key={item._id as Key}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default DataTable;
