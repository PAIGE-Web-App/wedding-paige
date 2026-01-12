import type { LucideIcon } from "lucide-react"

// Workspace navigation
export interface WorkspaceNavItem {
  id: string
  label: string
  icon: LucideIcon
  href?: string
  isActive?: boolean
  badge?: string
  badgeVariant?: "default" | "notReady"
}

// Contact/Vendor types
export type ContactType = "Venue" | "Catering" | "Photography" | "Florist" | "DJ" | "Other"

export interface Contact {
  id: string
  name: string
  type: ContactType
  subject: string
  suggestionsCount?: number
  isSelected?: boolean
}

// Detected update types
export type UpdateType = "Budget" | "Timeline" | "Contract" | "Payment"

export interface DetectedUpdate {
  id: string
  title: string
  amount?: string
  estimate?: string
  type: UpdateType
}

// Thread/Email types
export interface Thread {
  id: string
  contactId: string
  subject: string
  date: Date
  preview: string
  hasDetectedUpdates?: boolean
  detectedUpdates?: DetectedUpdate[]
}

// Component props
export interface WorkspaceHeaderProps {
  weddingId: string
  coupleNames: string
}

export interface WorkspaceSidebarProps {
  weddingId: string
  className?: string
}

export interface WorkspaceLayoutProps {
  weddingId: string
  coupleNames: string
  children: React.ReactNode
}

export interface NextStepBannerProps {
  title: string
  description: string
  tip?: string
  primaryAction?: {
    label: string
    onClick?: () => void
  }
  secondaryAction?: {
    label: string
    onClick?: () => void
  }
}

export interface InboxTabsProps {
  activeTab: "all" | "needsReview"
  messageCount: number
  onTabChange?: (tab: "all" | "needsReview") => void
}

export interface ContactCardProps {
  contact: Contact
  isSelected?: boolean
  onClick?: () => void
}

export interface ContactListProps {
  contacts: Contact[]
  selectedContactId?: string
  onContactSelect?: (contactId: string) => void
  onAddContact?: () => void
}

export interface ThreadCardProps {
  thread: Thread
  onViewEmails?: () => void
}

export interface ThreadListProps {
  threads: Thread[]
  onNewThread?: () => void
}

export interface DetectedUpdateProps {
  update: DetectedUpdate
  onAction?: () => void
}

export interface InboxContainerProps {
  contacts: Contact[]
  threads: Thread[]
  selectedContactId?: string
  onContactSelect?: (contactId: string) => void
}
