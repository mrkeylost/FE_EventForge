import { Tab, Tabs } from "@heroui/react";
import { Book, Component, MapPin, Ticket } from "lucide-react";
import useDetailEvent from "../_hooks/useDetailEvent";
import CoverTab from "./CoverTab";
import InfoTab from "./InfoTab";
import LocationTab from "./LocationTab";
import TicketTab from "./TicketTab";

const DetailEvent = () => {
  const {
    dataEvent,

    handleUpdateEvent,
    handleUpdateEventInformation,
    handleUpdateEventLocation,
    isPendingUpdateEvent,
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
            onUpdate={handleUpdateEventLocation}
            isPendingUpdate={isPendingUpdateEvent}
          />
        </Tab>
        <Tab
          key="ticket"
          title={
            <div className="flex items-center space-x-2">
              <Ticket />
              <span>Ticket</span>
            </div>
          }
        >
          <TicketTab />
        </Tab>
      </Tabs>
    </div>
  );
};

export default DetailEvent;
