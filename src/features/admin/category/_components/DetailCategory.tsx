import { Tab, Tabs } from "@heroui/react";
import { Book, Component } from "lucide-react";
import IconTab from "./IconTab";
import InfoTab from "./InfoTab";
import useDetailCategory from "../_hooks/useDetailCategory";

const DetailCategory = () => {
  const {
    dataCategory,

    handleUpdateCategory,
    isPendingUpdateCategory,
    isSuccessUpdateCategory,
  } = useDetailCategory();

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
          <IconTab
            currentIcon={dataCategory?.icon}
            onUpdate={handleUpdateCategory}
            isPendingUpdate={isPendingUpdateCategory}
            isSuccessUpdate={isSuccessUpdateCategory}
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
            dataCategory={dataCategory}
            onUpdate={handleUpdateCategory}
            isPendingUpdate={isPendingUpdateCategory}
            isSuccessUpdate={isSuccessUpdateCategory}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default DetailCategory;
