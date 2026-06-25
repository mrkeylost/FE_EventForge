import { DELAY } from "@/constant/list.constants";
import useDebounce from "@/hooks/useDebounce";
import useMediaHandling from "@/hooks/useMediaHandling";
import categoryServices from "@/services/category.service";
import eventServices from "@/services/event.service";
import { IEvent, IEventForm } from "@/types/event";
import { formatDateStandard } from "@/utils/date";
import { isValidFileType, MAX_FILE_SIZE } from "@/utils/file";
import { addToast, DateValue } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { getLocalTimeZone, now } from "@internationalized/date";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import * as Yup from "yup";

const eventSchema = Yup.object().shape({
  name: Yup.string().required("Please input name"),
  slug: Yup.string().required("Please input slug"),
  category: Yup.string().required("Please select category"),
  startDate: Yup.mixed<DateValue>().required("Please input start date"),
  endDate: Yup.mixed<DateValue>().required("Please input end date"),
  description: Yup.string().required("Please input description"),
  isFeatured: Yup.string().default("Please select event highlight"),
  isOnline: Yup.string().required("Please select event location"),
  isPublish: Yup.string().required("Please select status"),
  banner: Yup.mixed<FileList | string>()
    .required("Please input Banner")
    .test("fileType", "Not a valid image type", (value): boolean => {
      if (typeof value === "string") return value.length > 0;

      if (!(value instanceof FileList) || value.length === 0) return false;

      return isValidFileType(value[0].name, "image");
    })
    .test("fileSize", "Max allowed size is 100KB", (value): boolean => {
      if (typeof value === "string") return true;

      if (!(value instanceof FileList) || value.length === 0) return false;

      return value[0].size <= MAX_FILE_SIZE;
    }),
  address: Yup.string().required("Please input address"),
  region: Yup.string().required("Please select region"),
  latitude: Yup.string().required("Please input latitude coordinate"),
  longitude: Yup.string().required("Please input longitude coordinate"),
});

const useAddEventModal = () => {
  const router = useRouter();
  const debounce = useDebounce();
  const {
    control: addEventControl,
    handleSubmit: handleSubmitAddEvent,
    formState: { errors: addEventErrors },
    reset: addEventReset,
    getValues: addEventGetValues,
    setValue: addEventSetValue,
  } = useForm({
    resolver: yupResolver(eventSchema),
  });

  const { data: dataCategory } = useQuery({
    queryKey: ["Category"],
    queryFn: () => categoryServices.getCategories(),
    enabled: router.isReady,
  });

  const [searchRegency, setSearchRegency] = useState("");

  const { data: dataRegion } = useQuery({
    queryKey: ["Region", searchRegency],
    queryFn: () => eventServices.searchLocationByRegency(`${searchRegency}`),
    enabled: searchRegency !== "",
  });

  const handleSearchRegion = (region: string) => {
    debounce(() => setSearchRegency(region), DELAY);
  };

  const {
    isPendingUploadFile,
    isPendingDeleteFile,

    handleUploadFile,
    handleDeleteFile,
  } = useMediaHandling();

  const preview = useWatch({
    control: addEventControl,
    name: "banner",
  });

  useEffect(() => {
    addEventSetValue("startDate", now(getLocalTimeZone()));
    addEventSetValue("endDate", now(getLocalTimeZone()));
  }, [addEventSetValue]);

  const handleUploadBanner = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        addEventSetValue("banner", fileUrl);
      }
    });
  };

  const fileUrl = addEventGetValues("banner");

  const handleDeleteBanner = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleDeleteFile(fileUrl, () => onChange(undefined));
  };

  const handleOnClose = (onClose: () => void) => {
    handleDeleteFile(fileUrl, () => {
      addEventReset();
      setSearchRegency("");
      onClose();
    });
  };

  const addEvent = async (payload: IEvent) => {
    const res = await eventServices.createEvent(payload);

    return res;
  };

  const {
    mutate: mutateAddEvent,
    isPending: isPendingAddEvent,
    isSuccess: isSuccessAddEvent,
  } = useMutation({
    mutationFn: addEvent,
    onError(err) {
      addToast({
        title: "Add Event Failed",
        description: err.message,
        color: "danger",
      });
    },
    onSuccess: () => {
      addEventReset();
      setSearchRegency("");

      addToast({
        title: "Add Event Success",
        color: "success",
      });
    },
  });

  const handleAddEvent = (dataForm: IEventForm) => {
    const { latitude, longitude, region, address, ...data } = dataForm;

    const payload: IEvent = {
      ...data,
      isFeatured: data.isFeatured === "true",
      isPublish: data.isPublish === "true",
      isOnline: data.isOnline === "true",
      startDate: data.startDate ? formatDateStandard(data.startDate) : "",
      endDate: data.endDate ? formatDateStandard(data.endDate) : "",
      location: {
        address: address ? address : "",
        region: region ? region : "",
        coordinates: [Number(latitude), Number(longitude)],
      },
      banner: data.banner,
    };

    mutateAddEvent(payload);
  };

  return {
    addEventControl,
    addEventErrors,
    addEventReset,

    dataCategory,

    handleSubmitAddEvent,
    handleAddEvent,
    isPendingAddEvent,
    isSuccessAddEvent,

    preview,
    handleUploadBanner,
    isPendingUploadFile,
    handleDeleteBanner,
    isPendingDeleteFile,

    handleOnClose,

    dataRegion,
    searchRegency,
    handleSearchRegion,
  };
};

export default useAddEventModal;
