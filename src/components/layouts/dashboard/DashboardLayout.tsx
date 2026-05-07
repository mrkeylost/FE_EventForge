import PageHead from "@/components/commons/PageHead";
import { ReactNode, useState } from "react";
import DashboardLayoutSidebar from "./DashboardLayoutSidebar";
import {
  SIDEBAR_ADMIN,
  SIDEBAR_MEMBER,
} from "@/constant/dashboard/DashboardLayout.constants";
import { Navbar, NavbarMenuToggle } from "@heroui/react";

interface PropTypes {
  title?: string;
  type: "admin" | "member";
  description?: string;
  children: ReactNode;
}

const DashboardLayout = (props: PropTypes) => {
  const { title, type = "admin", description, children } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <PageHead title={title} />
      <div className="max-w-screen-3xl 3xl:container flex">
        <DashboardLayoutSidebar
          sidebarItems={type === "admin" ? SIDEBAR_ADMIN : SIDEBAR_MEMBER}
          isOpen={open}
        />
        <div className="h-screen w-full overflow-y-auto">
          <Navbar
            className="flex justify-between bg-transparent px-0"
            classNames={{ wrapper: "p-0" }}
            isBlurred={false}
            position="static"
          >
            <h1 className="text-3xl font-bold">{title}</h1>
            <NavbarMenuToggle
              aria-label={open ? "Close Menu" : "Open Menu"}
              onClick={() => setOpen(!open)}
              className="lg:hidden"
            />
          </Navbar>
          <p className="text-small mb-4">{description}</p>
          {children}
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
