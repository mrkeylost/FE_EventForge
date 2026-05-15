import { ICategory } from "@/types/category";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Skeleton,
  Spinner,
  Textarea,
} from "@heroui/react";
import { Save } from "lucide-react";
import useInfoTab from "../_hooks/useInfoTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";

interface PropTypes {
  dataCategory: ICategory;
  onUpdate: (data: { name: string; description: string }) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const InfoTab = (props: PropTypes) => {
  const { dataCategory, onUpdate, isPendingUpdate, isSuccessUpdate } = props;

  const {
    updateInfoControl,
    updateInfoErrors,
    updateInfoReset,
    updateInfoSetValue,
    handleSubmitUpdateInfo,
  } = useInfoTab();

  useEffect(() => {
    updateInfoSetValue("name", `${dataCategory?.name}`);
    updateInfoSetValue("name", `${dataCategory?.description}`);
  }, [dataCategory, updateInfoSetValue]);

  useEffect(() => {
    if (isSuccessUpdate) {
      updateInfoReset();
    }
  }, [isSuccessUpdate, updateInfoReset]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Category Information</h1>
        <p className="text-small text-default-400 w-full">
          Manage information of this category
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateInfo(onUpdate)}
        >
          <Skeleton isLoaded={!!dataCategory?.name} className="rounded-lg">
            <Controller
              name="name"
              control={updateInfoControl}
              render={({ field }) => (
                <Input
                  {...field}
                  autoFocus
                  label="Name"
                  variant="bordered"
                  autoComplete="off"
                  type="text"
                  defaultValue={dataCategory?.name}
                  isInvalid={!!updateInfoErrors.name}
                  errorMessage={updateInfoErrors.name?.message}
                  className="mt-2"
                />
              )}
            />
          </Skeleton>
          <Skeleton
            isLoaded={!!dataCategory?.description}
            className="rounded-lg"
          >
            <Controller
              name="description"
              control={updateInfoControl}
              render={({ field }) => (
                <Textarea
                  {...field}
                  label="Description"
                  variant="bordered"
                  autoComplete="off"
                  defaultValue={dataCategory?.description}
                  isInvalid={!!updateInfoErrors.description}
                  errorMessage={updateInfoErrors.description?.message}
                  className="mt-2"
                />
              )}
            />
          </Skeleton>
          <Button
            type="submit"
            color="danger"
            className="disabled:bg-default-500 mt-2"
            startContent={<Save />}
            disabled={isPendingUpdate || !dataCategory?._id}
          >
            {isPendingUpdate ? (
              <Spinner variant="dots" size="sm" color="white" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default InfoTab;
