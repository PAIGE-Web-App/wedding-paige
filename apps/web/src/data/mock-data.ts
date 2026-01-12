import {
  Home,
  LayoutTemplate,
  Users,
  Bell,
  User,
  ArrowLeft,
  FileText,
  Inbox,
  CheckSquare,
  Calendar,
  DollarSign,
  Store,
} from "lucide-react"
import type { NavItem, Wedding } from "@/types/wedding"
import type { WorkspaceNavItem, Contact, Thread } from "@/types/workspace"

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
  {
    id: "wed-002",
    coupleNames: "Sarah & Michael",
    date: new Date("2026-06-15"),
    location: "Austin, TX",
    venue: {
      name: "The Driskill Hotel",
      isSet: true,
    },
    status: "ready",
    intakeCompleted: true,
    alerts: [
      {
        id: "alert-002",
        type: "message_received",
        message: "3 new vendor messages",
        count: 3,
        actionLabel: "Go to Inbox",
        actionHref: "/weddings/wed-002/inbox",
      },
    ],
    createdAt: new Date("2025-12-01"),
  },
  {
    id: "wed-003",
    coupleNames: "Emma & James",
    date: new Date("2027-03-20"),
    location: "Houston, TX",
    venue: {
      name: null,
      isSet: false,
    },
    status: "needs_intake",
    statusMessage: "Waiting for couple intake",
    intakeCompleted: false,
    alerts: [],
    createdAt: new Date("2026-01-05"),
  },
  {
    id: "wed-004",
    coupleNames: "Olivia & Noah",
    date: new Date("2026-09-12"),
    location: "San Antonio, TX",
    venue: {
      name: "The Pearl Stable",
      isSet: true,
    },
    status: "complete",
    intakeCompleted: true,
    alerts: [
      {
        id: "alert-004",
        type: "payment_due",
        message: "2 payments due soon",
        count: 2,
        actionLabel: "View Payments",
        actionHref: "/weddings/wed-004/payments",
      },
    ],
    createdAt: new Date("2025-08-15"),
  },
  {
    id: "wed-005",
    coupleNames: "Sophia & Liam",
    date: new Date("2026-12-31"),
    location: "Miami, FL",
    venue: {
      name: "Vizcaya Museum",
      isSet: true,
    },
    status: "ready",
    intakeCompleted: true,
    alerts: [],
    createdAt: new Date("2025-11-20"),
  },
  {
    id: "wed-006",
    coupleNames: "Ava & Ethan",
    date: new Date("2027-05-22"),
    location: "Napa Valley, CA",
    venue: {
      name: null,
      isSet: false,
    },
    status: "importing",
    statusMessage: "Paige is setting things up",
    statusDetail: "Syncing with Google Calendar",
    intakeCompleted: false,
    alerts: [
      {
        id: "alert-006",
        type: "needs_review",
        message: "5 vendors need review",
        count: 5,
        actionLabel: "Go to Inbox",
        actionHref: "/weddings/wed-006/inbox",
      },
    ],
    createdAt: new Date("2026-01-08"),
  },
  {
    id: "wed-007",
    coupleNames: "Isabella & Mason",
    date: new Date("2026-08-08"),
    location: "Charleston, SC",
    venue: {
      name: "Boone Hall Plantation",
      isSet: true,
    },
    status: "complete",
    intakeCompleted: true,
    alerts: [
      {
        id: "alert-007",
        type: "message_received",
        message: "1 new vendor message",
        count: 1,
        actionLabel: "Go to Inbox",
        actionHref: "/weddings/wed-007/inbox",
      },
    ],
    createdAt: new Date("2025-06-10"),
  },
  {
    id: "wed-008",
    coupleNames: "Mia & Lucas",
    date: new Date("2027-02-14"),
    location: "Savannah, GA",
    venue: {
      name: null,
      isSet: false,
    },
    status: "needs_intake",
    statusMessage: "Waiting for couple intake",
    intakeCompleted: false,
    alerts: [],
    createdAt: new Date("2026-01-02"),
  },
  {
    id: "wed-009",
    coupleNames: "Harper & Alexander",
    date: new Date("2026-10-17"),
    location: "Aspen, CO",
    venue: {
      name: "The Little Nell",
      isSet: true,
    },
    status: "ready",
    intakeCompleted: true,
    alerts: [
      {
        id: "alert-009",
        type: "payment_due",
        message: "1 payment due soon",
        count: 1,
        actionLabel: "View Payments",
        actionHref: "/weddings/wed-009/payments",
      },
    ],
    createdAt: new Date("2025-09-25"),
  },
  {
    id: "wed-010",
    coupleNames: "Amelia & Benjamin",
    date: new Date("2027-07-04"),
    location: "Martha's Vineyard, MA",
    venue: {
      name: null,
      isSet: false,
    },
    status: "importing",
    statusMessage: "Paige is setting things up",
    statusDetail: "Importing emails & Vendor messages",
    intakeCompleted: false,
    alerts: [],
    createdAt: new Date("2026-01-10"),
  },
  {
    id: "wed-011",
    coupleNames: "Evelyn & William",
    date: new Date("2026-04-18"),
    location: "New Orleans, LA",
    venue: {
      name: "Race & Religious",
      isSet: true,
    },
    status: "complete",
    intakeCompleted: true,
    alerts: [
      {
        id: "alert-011",
        type: "message_received",
        message: "2 new vendor messages",
        count: 2,
        actionLabel: "Go to Inbox",
        actionHref: "/weddings/wed-011/inbox",
      },
    ],
    createdAt: new Date("2025-04-01"),
  },
  {
    id: "wed-012",
    coupleNames: "Charlotte & Henry",
    date: new Date("2027-09-25"),
    location: "Lake Tahoe, NV",
    venue: {
      name: null,
      isSet: false,
    },
    status: "needs_intake",
    statusMessage: "Waiting for couple intake",
    intakeCompleted: false,
    alerts: [
      {
        id: "alert-012",
        type: "needs_review",
        message: "2 vendors need review",
        count: 2,
        actionLabel: "Go to Inbox",
        actionHref: "/weddings/wed-012/inbox",
      },
    ],
    createdAt: new Date("2026-01-09"),
  },
]

// Workspace navigation items
export const getWorkspaceNavItems = (weddingId: string): WorkspaceNavItem[] => [
  {
    id: "back-home",
    label: "Back Home",
    icon: ArrowLeft,
    href: "/dashboard",
  },
  {
    id: "wedding-details",
    label: "Wedding Details",
    icon: FileText,
    href: `/weddings/${weddingId}/details`,
  },
  {
    id: "inbox",
    label: "Inbox",
    icon: Inbox,
    href: `/weddings/${weddingId}`,
    isActive: true,
  },
  {
    id: "todos",
    label: "To-dos",
    icon: CheckSquare,
    badge: "Not Ready",
    badgeVariant: "notReady",
  },
  {
    id: "timeline",
    label: "Timeline",
    icon: Calendar,
    badge: "Not Ready",
    badgeVariant: "notReady",
  },
  {
    id: "budget",
    label: "Budget",
    icon: DollarSign,
    badge: "Not Ready",
    badgeVariant: "notReady",
  },
  {
    id: "vendors",
    label: "Vendors",
    icon: Store,
    href: `/weddings/${weddingId}/vendors`,
  },
]

export const workspaceBottomNavItems: WorkspaceNavItem[] = [
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

// Mock contacts for inbox
export const mockContacts: Contact[] = [
  {
    id: "contact-001",
    name: "D'Vine Grace Vineyards",
    type: "Venue",
    subject: "Re: Venue Quote",
    suggestionsCount: 2,
    isSelected: true,
  },
  {
    id: "contact-002",
    name: "Bella Flora Design",
    type: "Florist",
    subject: "Re: Floral Arrangements",
    suggestionsCount: 0,
  },
  {
    id: "contact-003",
    name: "Lens & Light Photography",
    type: "Photography",
    subject: "Re: Photography Package",
    suggestionsCount: 1,
  },
]

// Mock threads for inbox
export const mockThreads: Thread[] = [
  {
    id: "thread-001",
    contactId: "contact-001",
    subject: "Re: Venue Quote",
    date: new Date("2025-11-02"),
    preview: "Hi Christine, Congratulations on your engagement! 🎉",
    hasDetectedUpdates: true,
    detectedUpdates: [
      {
        id: "update-001",
        title: "Venue Budget Update",
        amount: "$95pp",
        estimate: "Est. $1,200 tax",
        type: "Budget",
      },
      {
        id: "update-002",
        title: "Venue Budget Update",
        amount: "$95pp",
        estimate: "Est. $1,200 tax",
        type: "Budget",
      },
    ],
  },
  {
    id: "thread-002",
    contactId: "contact-001",
    subject: "Re: Venue Quote Update",
    date: new Date("2025-12-18"),
    preview: "Hi there, here is an update to the venue quote",
    hasDetectedUpdates: false,
  },
  {
    id: "thread-003",
    contactId: "contact-001",
    subject: "Re: Venue Update Terms & Conditions",
    date: new Date("2025-12-18"),
    preview: "So sorry, here is the latest terms & conditions.",
    hasDetectedUpdates: false,
  },
]
