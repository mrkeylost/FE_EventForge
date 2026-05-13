import { cn } from "@/utils/cn";
import { ToastProvider } from "@heroui/react";
import { Inter } from "next/font/google";
import { ReactNode } from "react";

interface PropTypes {
  children: ReactNode;
}

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const AppWrapper = (props: PropTypes) => {
  const { children } = props;

  return (
    <main className={cn(inter.className)}>
      <ToastProvider placement="top-right" toastOffset={20} />
      {children}
    </main>
  );
};

export default AppWrapper;
