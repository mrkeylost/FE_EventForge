import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
  Skeleton,
  Spinner,
} from "@heroui/react";
import { Save } from "lucide-react";
import useInfoTab from "../_hooks/useInfoTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { IBanner } from "@/types/banner";

interface PropTypes {
  dataBanner: IBanner;
  onUpdate: (data: { title: string; isShow: string }) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const InfoTab = (props: PropTypes) => {
  const { dataBanner, onUpdate, isPendingUpdate, isSuccessUpdate } = props;

  const {
    updateInfoControl,
    updateInfoErrors,
    updateInfoReset,
    updateInfoSetValue,
    handleSubmitUpdateInfo,
  } = useInfoTab();

  useEffect(() => {
    updateInfoSetValue("title", `${dataBanner?.title}`);
    updateInfoSetValue("isShow", `${dataBanner?.isShow}`);
  }, [dataBanner, updateInfoSetValue]);

  useEffect(() => {
    if (isSuccessUpdate) {
      updateInfoReset();
    }
  }, [isSuccessUpdate, updateInfoReset]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Banner Information</h1>
        <p className="text-small text-default-400 w-full">
          Manage information of this banner
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateInfo(onUpdate)}
        >
          <Skeleton isLoaded={!!dataBanner?.title} className="rounded-lg">
            <Controller
              name="title"
              control={updateInfoControl}
              render={({ field }) => (
                <Input
                  {...field}
                  autoFocus
                  label="Title"
                  variant="bordered"
                  autoComplete="off"
                  type="text"
                  defaultValue={dataBanner?.title}
                  isInvalid={!!updateInfoErrors.title}
                  errorMessage={updateInfoErrors.title?.message}
                  className="mt-2"
                />
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataBanner} className="rounded-lg">
            <Controller
              name="isShow"
              control={updateInfoControl}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Status"
                  variant="bordered"
                  autoComplete="off"
                  disallowEmptySelection
                  defaultSelectedKeys={[String(dataBanner?.isShow)]}
                  isInvalid={!!updateInfoErrors.isShow}
                  errorMessage={updateInfoErrors.isShow?.message}
                  className="mt-2"
                >
                  <SelectItem key="true">Show</SelectItem>
                  <SelectItem key="false">Hide</SelectItem>
                </Select>
              )}
            />
          </Skeleton>
          <Button
            type="submit"
            color="danger"
            className="disabled:bg-default-500 mt-2"
            startContent={<Save />}
            disabled={isPendingUpdate || !dataBanner?._id}
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
