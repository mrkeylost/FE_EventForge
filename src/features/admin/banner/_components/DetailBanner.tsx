import { Tab, Tabs } from "@heroui/react";
import { Book, Component } from "lucide-react";
import useDetailBanner from "../_hooks/useDetailBanner";
import ImageTab from "./ImageTab";
import InfoTab from "./InfoTab";

const DetailBanner = () => {
  const {
    dataBanner,

    handleUpdateBanner,
    isPendingUpdateBanner,
    isSuccessUpdateBanner,
  } = useDetailBanner();

  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Options">
        <Tab
          key="image"
          title={
            <div className="flex items-center space-x-2">
              <Component />
              <span>Image</span>
            </div>
          }
        >
          <ImageTab
            currentImage={dataBanner?.image}
            onUpdate={handleUpdateBanner}
            isPendingUpdate={isPendingUpdateBanner}
            isSuccessUpdate={isSuccessUpdateBanner}
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
            dataBanner={dataBanner}
            onUpdate={handleUpdateBanner}
            isPendingUpdate={isPendingUpdateBanner}
            isSuccessUpdate={isSuccessUpdateBanner}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default DetailBanner;
