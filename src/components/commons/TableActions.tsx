import { Button } from "@heroui/react";
import { Eye, Pencil, Trash2 } from "lucide-react";

interface PropTypes {
  requireDetail?: boolean;
  requireDelete?: boolean;
  requireEdit?: boolean;
  onPressButtonDetail?: () => void;
  onPressButtonDelete?: () => void;
}

const TableActions = (props: PropTypes) => {
  const {
    requireDetail = true,
    requireDelete = true,
    requireEdit,
    onPressButtonDetail,
    onPressButtonDelete,
  } = props;
  return (
    <div className="flex items-center justify-center gap-1">
      {requireDetail && (
        <Button
          isIconOnly
          variant="light"
          size="sm"
          aria-label="View event"
          onPress={onPressButtonDetail}
        >
          <Eye size={16} />
        </Button>
      )}
      {requireEdit && (
        <Button isIconOnly variant="light" size="sm" aria-label="Edit event">
          <Pencil size={16} />
        </Button>
      )}
      {requireDelete && (
        <Button
          isIconOnly
          variant="light"
          size="sm"
          color="danger"
          aria-label="Delete event"
          onPress={onPressButtonDelete}
        >
          <Trash2 size={16} />
        </Button>
      )}
    </div>
  );
};

export default TableActions;
