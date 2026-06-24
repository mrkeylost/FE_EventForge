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
  onUpdate: (data: IEventForm, onSuccess?: () => void) => void;
  isPendingUpdate: boolean;
}

const LocationTab = (props: PropTypes) => {
  const { dataEvent, onUpdate, isPendingUpdate } = props;

  const {
    dataRegion,
    searchRegency,
    handleSearchRegion,

    dataInitialRegion,
    isPendingInitialRegion,

    updateLocationControl,
    updateLocationErrors,
    updateLocationReset,
    updateLocationSetValue,
    handleSubmitUpdateLocation,
  } = useLocationTab(dataEvent.location?.region);

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

  const regionItems = [
    ...(dataInitialRegion?.data?.data ?? []),
    ...(dataRegion?.data?.data && searchRegency !== ""
      ? dataRegion.data.data.filter(
          (r: IRegion) =>
            !dataInitialRegion?.data?.data?.some(
              (init: IRegion) => init.id === r.id,
            ),
        )
      : []),
  ];

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
          onSubmit={handleSubmitUpdateLocation((data) =>
            onUpdate(data, () => updateLocationReset()),
          )}
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
            isLoaded={!!dataEvent?.location?.region && !isPendingInitialRegion}
            className="rounded-lg"
          >
            <Controller
              name="region"
              control={updateLocationControl}
              render={({ field: { onChange, ...field } }) => (
                <Autocomplete
                  {...field}
                  key={dataInitialRegion?.data?.data[0].id}
                  defaultItems={regionItems}
                  label="City"
                  placeholder="Search city here.."
                  variant="bordered"
                  defaultInputValue={
                    dataInitialRegion?.data?.data[0].name ?? ""
                  }
                  isInvalid={!!updateLocationErrors.region}
                  errorMessage={updateLocationErrors.region?.message}
                  onChange={(key: Key | null) => onChange(key)}
                  onInputChange={(search) => handleSearchRegion(search)}
                >
                  {(region: IRegion) => (
                    <AutocompleteItem key={region.id}>
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
