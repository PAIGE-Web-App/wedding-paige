import {
  Home,
  LayoutTemplate,
  Users,
  Bell,
  User,
} from "lucide-react"
import type { NavItem, Wedding } from "@/types/wedding"

export const mainNavItems: NavItem[] = [
  {
    id: "home",
    label: "Home",
    icon: Home,
    href: "/dashboard",
    isActive: true,
  },
  {
    id: "templates",
    label: "Templates",
    icon: LayoutTemplate,
    href: "/templates",
  },
  {
    id: "vendors",
    label: "Vendor Library",
    icon: Users,
    href: "/vendors",
  },
]

export const bottomNavItems: NavItem[] = [
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
    href: "/notifications",
  },
  {
    id: "profile",
    label: "Profile",
    icon: User,
    href: "/profile",
  },
]

export const mockWeddings: Wedding[] = [
  {
    id: "wed-001",
    coupleNames: "Christine & Davey",
    date: new Date("2026-11-08"),
    location: "Dallas, TX",
    venue: {
      name: null,
      isSet: false,
    },
    status: "importing",
    statusMessage: "Paige is setting things up",
    statusDetail: "Importing emails & Vendor messages",
    intakeCompleted: false,
    alerts: [
      {
        id: "alert-001",
        type: "needs_review",
        message: "1 vendor needs review",
        count: 1,
        actionLabel: "Go to Inbox",
        actionHref: "/weddings/wed-001/inbox",
      },
    ],
    createdAt: new Date(),
  },
]
