import {
  Autocomplete,
  AutocompleteItem,
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
import { Controller } from "react-hook-form";
import { Key, useEffect } from "react";
import { IEventForm, IRegion } from "@/types/event";
import useLocationTab from "../_hooks/useLocationTab";

interface PropTypes {
  dataEvent: IEventForm;
  dataCity: string;
  isPendingDataCity: boolean;
  onUpdate: (data: IEventForm) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const LocationTab = (props: PropTypes) => {
  const {
    dataEvent,
    dataCity,
    isPendingDataCity,
    onUpdate,
    isPendingUpdate,
    isSuccessUpdate,
  } = props;

  const {
    dataRegion,
    searchRegency,
    handleSearchRegion,

    updateLocationControl,
    updateLocationErrors,
    updateLocationReset,
    updateLocationSetValue,
    handleSubmitUpdateLocation,
  } = useLocationTab();

  useEffect(() => {
    updateLocationSetValue("isOnline", `${dataEvent?.isOnline}`);
    updateLocationSetValue("region", `${dataEvent?.location?.region}`);
    updateLocationSetValue(
      "latitude",
      `${dataEvent?.location?.coordinates[0]}`,
    );
    updateLocationSetValue(
      "longitude",
      `${dataEvent?.location?.coordinates[1]}`,
    );
  }, [dataEvent, updateLocationSetValue]);

  useEffect(() => {
    if (isSuccessUpdate) {
      updateLocationReset();
    }
  }, [isSuccessUpdate, updateLocationReset]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Event Location</h1>
        <p className="text-small text-default-400 w-full">
          Manage location of this event
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateLocation(onUpdate)}
        >
          <Skeleton isLoaded={!!dataEvent} className="rounded-lg">
            <Controller
              name="isOnline"
              control={updateLocationControl}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Online/Offline"
                  variant="bordered"
                  autoComplete="off"
                  disallowEmptySelection
                  defaultSelectedKeys={[String(dataEvent?.isOnline)]}
                  isInvalid={!!updateLocationErrors.isOnline}
                  errorMessage={updateLocationErrors.isOnline?.message}
                >
                  <SelectItem key="true">Online</SelectItem>
                  <SelectItem key="false">Offline</SelectItem>
                </Select>
              )}
            />
          </Skeleton>

          <Skeleton
            isLoaded={!!dataEvent?.location?.region && !isPendingDataCity}
            className="rounded-lg"
          >
            <Controller
              name="region"
              control={updateLocationControl}
              render={({ field: { onChange, ...field } }) => (
                <Autocomplete
                  {...field}
                  defaultItems={
                    dataRegion?.data.data && searchRegency !== ""
                      ? dataRegion?.data.data
                      : []
                  }
                  label="City"
                  placeholder="Search city here.."
                  variant="bordered"
                  defaultInputValue={dataCity}
                  isInvalid={!!updateLocationErrors.region}
                  errorMessage={updateLocationErrors.region?.message}
                  onChange={(key: Key | null) => onChange(key)}
                  onInputChange={(search) => handleSearchRegion(search)}
                >
                  {(region: IRegion) => (
                    <AutocompleteItem key={region._id}>
                      {region.name}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              )}
            />
          </Skeleton>

          <Skeleton
            isLoaded={!!dataEvent?.location?.coordinates[0]}
            className="rounded-lg"
          >
            <Controller
              name="latitude"
              control={updateLocationControl}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Latitude"
                  variant="bordered"
                  autoComplete="off"
                  type="text"
                  defaultValue={String(dataEvent?.location?.coordinates[0])}
                  isInvalid={!!updateLocationErrors.latitude}
                  errorMessage={updateLocationErrors.latitude?.message}
                />
              )}
            />
          </Skeleton>

          <Skeleton
            isLoaded={!!dataEvent?.location?.coordinates[1]}
            className="rounded-lg"
          >
            <Controller
              name="longitude"
              control={updateLocationControl}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Longitude"
                  variant="bordered"
                  autoComplete="off"
                  type="text"
                  defaultValue={String(dataEvent?.location?.coordinates[1])}
                  isInvalid={!!updateLocationErrors.longitude}
                  errorMessage={updateLocationErrors.longitude?.message}
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

export default LocationTab;
