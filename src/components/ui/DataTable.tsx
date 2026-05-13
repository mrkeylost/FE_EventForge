import { LIMIT_LISTS } from "@/constant/list.constants";
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
import { ChangeEvent, Key, ReactNode, useMemo } from "react";

interface PropTypes {
  columns: Record<string, unknown>[];
  data: Record<string, unknown>[];
  currentPage: number;
  totalPages: number;
  limit: string;
  onChangeLimit: (e: ChangeEvent<HTMLSelectElement>) => void;
  onChangePage: (page: number) => void;
  buttonTopContentLabel?: string;
  onClickButtonTop?: () => void;
  onClear: () => void;
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  renderCell: (item: Record<string, unknown>, columnKey: Key) => ReactNode;
  emptyContent: string;
  isLoading?: boolean;
}

const DataTable = (props: PropTypes) => {
  const {
    columns,
    data,
    currentPage,
    totalPages,
    limit,
    onChangeLimit,
    onChangePage,
    buttonTopContentLabel,
    onClickButtonTop,
    renderCell,
    onClear,
    onSearchChange,
    emptyContent,
    isLoading,
  } = props;

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Input
          isClearable
          className="w-full sm:w-64"
          placeholder="Search by name..."
          startContent={<Search />}
          onClear={onClear}
          onChange={onSearchChange}
        />
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
  }, [buttonTopContentLabel, onClickButtonTop, onClear, onSearchChange]);

  const bottomContent = useMemo(() => {
    return (
      <div className="flex items-center justify-center sm:justify-between">
        <Select
          disallowEmptySelection
          className="hidden max-w-36 md:block"
          size="md"
          selectedKeys={[limit]}
          selectionMode="single"
          startContent={<p className="text-small">Show: </p>}
          onChange={onChangeLimit}
        >
          {LIMIT_LISTS.map((item) => (
            <SelectItem key={item.value}>{item.label}</SelectItem>
          ))}
        </Select>

        {totalPages > 1 && (
          <Pagination
            showControls
            isCompact
            classNames={{
              cursor: "bg-foreground text-background",
            }}
            color="danger"
            page={currentPage}
            total={totalPages}
            onChange={onChangePage}
            loop
          />
        )}
      </div>
    );
  }, [limit, onChangeLimit, currentPage, totalPages, onChangePage]);

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
