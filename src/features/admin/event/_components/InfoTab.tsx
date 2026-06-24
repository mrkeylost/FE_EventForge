import { ICategory } from "@/types/category";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  DatePicker,
  Input,
  Select,
  SelectItem,
  Skeleton,
  Spinner,
  Textarea,
} from "@heroui/react";
import { Save } from "lucide-react";
import { Controller } from "react-hook-form";
import { Key, useEffect } from "react";
import { IEventForm } from "@/types/event";
import useInfoTab from "../_hooks/useInfoTab";
import { toInputDate } from "@/utils/date";

interface PropTypes {
  dataEvent: IEventForm;
  onUpdate: (data: IEventForm, onSuccess?: () => void) => void;
  isPendingUpdate: boolean;
}

const InfoTab = (props: PropTypes) => {
  const { dataEvent, onUpdate, isPendingUpdate } = props;

  const {
    dataCategory,

    updateInfoControl,
    updateInfoErrors,
    updateInfoReset,
    updateInfoSetValue,
    handleSubmitUpdateInfo,
  } = useInfoTab();

  useEffect(() => {
    updateInfoSetValue("name", `${dataEvent?.name}`);
    updateInfoSetValue("slug", `${dataEvent?.slug}`);
    updateInfoSetValue("category", `${dataEvent?.category}`);
    updateInfoSetValue("startDate", toInputDate(`${dataEvent.startDate}`));
    updateInfoSetValue("endDate", toInputDate(`${dataEvent.endDate}`));
    updateInfoSetValue("isPublish", `${dataEvent?.isPublish}`);
    updateInfoSetValue("isFeatured", `${dataEvent?.isFeatured}`);
    updateInfoSetValue("description", `${dataEvent?.description}`);
  }, [dataEvent, updateInfoSetValue]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Event Information</h1>
        <p className="text-small text-default-400 w-full">
          Manage information of this event
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateInfo((data) =>
            onUpdate(data, () => updateInfoReset()),
          )}
        >
          <Skeleton isLoaded={!!dataEvent?.name} className="rounded-lg">
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
                  defaultValue={dataEvent?.name}
                  isInvalid={!!updateInfoErrors.name}
                  errorMessage={updateInfoErrors.name?.message}
                  className="mt-2"
                />
              )}
            />
          </Skeleton>

          <Skeleton isLoaded={!!dataEvent?.slug} className="rounded-lg">
            <Controller
              name="slug"
              control={updateInfoControl}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Slug"
                  variant="bordered"
                  autoComplete="off"
                  type="text"
                  defaultValue={dataEvent?.slug}
                  isInvalid={!!updateInfoErrors.slug}
                  errorMessage={updateInfoErrors.slug?.message}
                  className="mt-2"
                />
              )}
            />
          </Skeleton>

          <Skeleton isLoaded={!!dataEvent?.category} className="rounded-lg">
            <Controller
              name="category"
              control={updateInfoControl}
              render={({ field: { onChange, ...field } }) => (
                <Autocomplete
                  {...field}
                  defaultItems={dataCategory?.data.data || []}
                  label="Category"
                  placeholder="Search category here.."
                  variant="bordered"
                  defaultValue={dataEvent?.category}
                  isInvalid={!!updateInfoErrors.category}
                  errorMessage={updateInfoErrors.category?.message}
                  onChange={(key: Key | null) => onChange(key)}
                  className="mt-2"
                >
                  {(category: ICategory) => (
                    <AutocompleteItem key={category._id}>
                      {category.name}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              )}
            />
          </Skeleton>

          <Skeleton isLoaded={!!dataEvent?.startDate} className="rounded-lg">
            <Controller
              name="startDate"
              control={updateInfoControl}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label="Start Date"
                  variant="bordered"
                  autoComplete="off"
                  showMonthAndYearPickers
                  hideTimeZone
                  // defaultValue={dataEvent?.startDate}
                  isInvalid={!!updateInfoErrors.startDate}
                  errorMessage={updateInfoErrors.startDate?.message}
                  className="mt-2"
                />
              )}
            />
          </Skeleton>

          <Skeleton isLoaded={!!dataEvent?.endDate} className="rounded-lg">
            <Controller
              name="endDate"
              control={updateInfoControl}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label="End Date"
                  variant="bordered"
                  autoComplete="off"
                  showMonthAndYearPickers
                  hideTimeZone
                  // defaultValue={dataEvent?.endDate}
                  isInvalid={!!updateInfoErrors.endDate}
                  errorMessage={updateInfoErrors.endDate?.message}
                  className="mt-2"
                />
              )}
            />
          </Skeleton>

          <Skeleton isLoaded={!!dataEvent} className="rounded-lg">
            <Controller
              name="isPublish"
              control={updateInfoControl}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Status"
                  variant="bordered"
                  autoComplete="off"
                  disallowEmptySelection
                  defaultSelectedKeys={[String(dataEvent?.isPublish)]}
                  isInvalid={!!updateInfoErrors.isPublish}
                  errorMessage={updateInfoErrors.isPublish?.message}
                  className="mt-2"
                >
                  <SelectItem key="true">Publish</SelectItem>
                  <SelectItem key="false">Draft</SelectItem>
                </Select>
              )}
            />
          </Skeleton>

          <Skeleton isLoaded={!!dataEvent} className="rounded-lg">
            <Controller
              name="isFeatured"
              control={updateInfoControl}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Featured"
                  variant="bordered"
                  autoComplete="off"
                  disallowEmptySelection
                  defaultSelectedKeys={[String(dataEvent?.isFeatured)]}
                  isInvalid={!!updateInfoErrors.isFeatured}
                  errorMessage={updateInfoErrors.isFeatured?.message}
                  className="mt-2"
                >
                  <SelectItem key="true">Yes</SelectItem>
                  <SelectItem key="false">No</SelectItem>
                </Select>
              )}
            />
          </Skeleton>

          <Skeleton isLoaded={!!dataEvent?.description} className="rounded-lg">
            <Controller
              name="description"
              control={updateInfoControl}
              render={({ field }) => (
                <Textarea
                  {...field}
                  label="Description"
                  variant="bordered"
                  autoComplete="off"
                  defaultValue={dataEvent?.description}
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
            disabled={isPendingUpdate || !dataEvent?._id}
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
