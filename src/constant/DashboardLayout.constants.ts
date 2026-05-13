import {
  Bookmark,
  LayoutDashboard,
  Notebook,
  Settings,
  Tag,
  WalletMinimal,
} from "lucide-react";

export const SIDEBAR_MEMBER = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/member/dashboard",
    icon: LayoutDashboard,
  },
  {
    key: "transaction",
    label: "Transaction",
    href: "/member/transaction",
    icon: WalletMinimal,
  },
  {
    key: "setting",
    label: "Setting",
    href: "/member/setting",
    icon: Settings,
  },
];

export const SIDEBAR_ADMIN = [
  {
    key: "dashboard",
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    key: "event",
    label: "Event",
    href: "/admin/event",
    icon: Notebook,
  },
  {
    key: "category",
    label: "Category",
    href: "/admin/category",
    icon: Tag,
  },
  {
    key: "banner",
    label: "Banner",
    href: "/admin/banner",
    icon: Bookmark,
  },
  {
    key: "transaction",
    label: "Transaction",
    href: "/admin/transaction",
    icon: WalletMinimal,
  },
];
