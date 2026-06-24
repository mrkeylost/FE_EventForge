import InputFile from "@/components/ui/InputFile";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  DatePicker,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Spinner,
  Textarea,
} from "@heroui/react";
import { Controller } from "react-hook-form";
import { Key, useEffect } from "react";
import { Save } from "lucide-react";
import useAddEventModal from "../_hooks/useAddEventModal";
import { ICategory } from "@/types/category";
import { IRegion } from "@/types/event";
import { getLocalTimeZone, now } from "@internationalized/date";
import { useQueryClient } from "@tanstack/react-query";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
}

const AddEventModal = (props: PropTypes) => {
  const queryClient = useQueryClient();
  const { isOpen, onClose, onOpenChange } = props;
  const {
    addEventControl,
    addEventErrors,

    dataCategory,

    handleSubmitAddEvent,
    handleAddEvent,
    isPendingAddEvent,
    isSuccessAddEvent,

    handleUploadBanner,
    isPendingUploadFile,
    handleDeleteBanner,
    isPendingDeleteFile,
    preview,

    handleOnClose,

    dataRegion,
    searchRegency,
    handleSearchRegion,
  } = useAddEventModal();

  useEffect(() => {
    if (isSuccessAddEvent) {
      onClose();

      queryClient.invalidateQueries({ queryKey: ["Event"] });
    }
  }, [isSuccessAddEvent, onClose, queryClient]);

  const disabledButton =
    isPendingAddEvent || isPendingUploadFile || isPendingDeleteFile;

  return (
    <Modal
      size="2xl"
      scrollBehavior="inside"
      isOpen={isOpen}
      placement="center"
      onOpenChange={onOpenChange}
      onClose={() => handleOnClose(onClose)}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Add Event</ModalHeader>
        <ModalBody>
          <form
            id="addEventForm"
            onSubmit={handleSubmitAddEvent(handleAddEvent)}
          >
            <div className="mb-4 flex flex-col gap-4">
              <strong>Information</strong>
              <Controller
                name="name"
                control={addEventControl}
                render={({ field }) => (
                  <Input
                    {...field}
                    autoFocus
                    label="Name"
                    variant="bordered"
                    autoComplete="off"
                    type="text"
                    isInvalid={!!addEventErrors.name}
                    errorMessage={addEventErrors.name?.message}
                  />
                )}
              />

              <Controller
                name="slug"
                control={addEventControl}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Slug"
                    variant="bordered"
                    autoComplete="off"
                    type="text"
                    isInvalid={!!addEventErrors.slug}
                    errorMessage={addEventErrors.slug?.message}
                  />
                )}
              />

              <Controller
                name="category"
                control={addEventControl}
                render={({ field: { onChange, ...field } }) => (
                  <Autocomplete
                    {...field}
                    defaultItems={dataCategory?.data.data || []}
                    label="Category"
                    placeholder="Search category here.."
                    variant="bordered"
                    isInvalid={!!addEventErrors.category}
                    errorMessage={addEventErrors.category?.message}
                    onChange={(key: Key | null) => onChange(key)}
                  >
                    {(category: ICategory) => (
                      <AutocompleteItem key={category._id}>
                        {category.name}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
                )}
              />

              <div className="flex w-full flex-wrap gap-4 md:flex-nowrap">
                <Controller
                  name="startDate"
                  control={addEventControl}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label="Start Date"
                      variant="bordered"
                      autoComplete="off"
                      showMonthAndYearPickers
                      hideTimeZone
                      defaultValue={now(getLocalTimeZone())}
                      isInvalid={!!addEventErrors.startDate}
                      errorMessage={addEventErrors.startDate?.message}
                    />
                  )}
                />
                <Controller
                  name="endDate"
                  control={addEventControl}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label="End Date"
                      variant="bordered"
                      autoComplete="off"
                      showMonthAndYearPickers
                      hideTimeZone
                      defaultValue={now(getLocalTimeZone())}
                      isInvalid={!!addEventErrors.endDate}
                      errorMessage={addEventErrors.endDate?.message}
                    />
                  )}
                />
              </div>

              <Controller
                name="isPublish"
                control={addEventControl}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Status"
                    variant="bordered"
                    autoComplete="off"
                    disallowEmptySelection
                    isInvalid={!!addEventErrors.isPublish}
                    errorMessage={addEventErrors.isPublish?.message}
                  >
                    <SelectItem key="true">Publish</SelectItem>
                    <SelectItem key="false">Draft</SelectItem>
                  </Select>
                )}
              />

              <div className="flex w-full flex-wrap gap-4 md:flex-nowrap">
                <Controller
                  name="isFeatured"
                  control={addEventControl}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Featured"
                      variant="bordered"
                      autoComplete="off"
                      disallowEmptySelection
                      isInvalid={!!addEventErrors.isFeatured}
                      errorMessage={addEventErrors.isFeatured?.message}
                    >
                      <SelectItem key="true">Yes</SelectItem>
                      <SelectItem key="false">No</SelectItem>
                    </Select>
                  )}
                />
                <Controller
                  name="isOnline"
                  control={addEventControl}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Online/Offline"
                      variant="bordered"
                      autoComplete="off"
                      disallowEmptySelection
                      isInvalid={!!addEventErrors.isOnline}
                      errorMessage={addEventErrors.isOnline?.message}
                    >
                      <SelectItem key="true">Online</SelectItem>
                      <SelectItem key="false">Offline</SelectItem>
                    </Select>
                  )}
                />
              </div>

              <Controller
                name="description"
                control={addEventControl}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    label="Description"
                    variant="bordered"
                    autoComplete="off"
                    isInvalid={!!addEventErrors.description}
                    errorMessage={addEventErrors.description?.message}
                  />
                )}
              />
            </div>

            <div className="flex flex-col gap-3">
              <strong>Location</strong>
              <Controller
                name="region"
                control={addEventControl}
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
                    isInvalid={!!addEventErrors.region}
                    errorMessage={addEventErrors.region?.message}
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

              <div className="flex w-full flex-wrap gap-4 md:flex-nowrap">
                <Controller
                  name="latitude"
                  control={addEventControl}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Latitude"
                      variant="bordered"
                      autoComplete="off"
                      type="text"
                      isInvalid={!!addEventErrors.latitude}
                      errorMessage={addEventErrors.latitude?.message}
                    />
                  )}
                />
                <Controller
                  name="longitude"
                  control={addEventControl}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Longitude"
                      variant="bordered"
                      autoComplete="off"
                      type="text"
                      isInvalid={!!addEventErrors.longitude}
                      errorMessage={addEventErrors.longitude?.message}
                    />
                  )}
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <strong>Cover</strong>
              <Controller
                name="banner"
                control={addEventControl}
                render={({ field: { onChange, ...field } }) => (
                  <InputFile
                    {...field}
                    onUpload={(files) => handleUploadBanner(files, onChange)}
                    onDelete={() => handleDeleteBanner(onChange)}
                    isUploading={isPendingUploadFile}
                    isDeleting={isPendingDeleteFile}
                    preview={typeof preview === "string" ? preview : ""}
                    isDropable
                    isInvalid={!!addEventErrors.banner}
                    errorMessage={addEventErrors.banner?.message}
                  />
                )}
              />
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            variant="flat"
            onPress={() => handleOnClose(onClose)}
            disabled={disabledButton}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="addEventForm"
            color="danger"
            disabled={disabledButton}
            startContent={<Save />}
          >
            {isPendingAddEvent ? (
              <Spinner variant="dots" size="sm" color="white" />
            ) : (
              "Create Event"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddEventModal;
