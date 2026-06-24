import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import eventServices from "@/services/event.service";
import { useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import { DELAY } from "@/constant/list.constants";

const updateLocationSchema = Yup.object().shape({
  isOnline: Yup.string().required("Please select event location"),
  region: Yup.string().required("Please select region"),
  latitude: Yup.string().required("Please input latitude coordinate"),
  longitude: Yup.string().required("Please input longitude coordinate"),
});

const useLocationTab = (currentRegencyId?: string) => {
  const debounce = useDebounce();
  const {
    control: updateLocationControl,
    handleSubmit: handleSubmitUpdateLocation,
    formState: { errors: updateLocationErrors },
    reset: updateLocationReset,
    setValue: updateLocationSetValue,
  } = useForm({
    resolver: yupResolver(updateLocationSchema),
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

  const { data: dataInitialRegion, isPending: isPendingInitialRegion } =
    useQuery({
      queryKey: ["InitialRegion", currentRegencyId],
      queryFn: () => eventServices.getRegencyData(Number(currentRegencyId)),
      enabled: !!currentRegencyId,
    });

  return {
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
  };
};

export default useLocationTab;
