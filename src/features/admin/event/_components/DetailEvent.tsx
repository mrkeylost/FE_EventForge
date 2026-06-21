import { Tab, Tabs } from "@heroui/react";
import { Book, Component, MapPin } from "lucide-react";
import useDetailEvent from "../_hooks/useDetailEvent";
import CoverTab from "./CoverTab";
import InfoTab from "./InfoTab";
import LocationTab from "./LocationTab";

const DetailEvent = () => {
  const {
    dataEvent,

    dataCity,
    isPendingDataCity,

    handleUpdateEvent,
    handleUpdateEventInformation,
    handleUpdateEventLocation,
    isPendingUpdateEvent,
    isSuccessUpdateEvent,
  } = useDetailEvent();

  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Options">
        <Tab
          key="icon"
          title={
            <div className="flex items-center space-x-2">
              <Component />
              <span>Icon</span>
            </div>
          }
        >
          <CoverTab
            currentCover={dataEvent?.banner}
            onUpdate={handleUpdateEvent}
            isPendingUpdate={isPendingUpdateEvent}
            isSuccessUpdate={isSuccessUpdateEvent}
          />
        </Tab>
        <Tab
          key="info"
          title={
            <div className="flex items-center space-x-2">
              <Book />
              <span>Information</span>
            </div>
          }
        >
          <InfoTab
            dataEvent={dataEvent}
            onUpdate={handleUpdateEventInformation}
            isPendingUpdate={isPendingUpdateEvent}
            isSuccessUpdate={isSuccessUpdateEvent}
          />
        </Tab>
        <Tab
          key="location"
          title={
            <div className="flex items-center space-x-2">
              <MapPin />
              <span>Location</span>
            </div>
          }
        >
          <LocationTab
            dataEvent={dataEvent}
            dataCity={dataCity?.data?.data[0].name}
            isPendingDataCity={isPendingDataCity}
            onUpdate={handleUpdateEventLocation}
            isPendingUpdate={isPendingUpdateEvent}
            isSuccessUpdate={isSuccessUpdateEvent}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default DetailEvent;
