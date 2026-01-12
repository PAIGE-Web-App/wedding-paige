import type { LucideIcon } from "lucide-react"

// Navigation types
export interface NavItem {
  id: string
  label: string
  icon: LucideIcon
  href: string
  isActive?: boolean
  badge?: number
}

// Wedding types
export type WeddingSetupStatus =
  | "importing"
  | "ready"
  | "needs_intake"
  | "complete"

export type VendorAlertType =
  | "needs_review"
  | "message_received"
  | "payment_due"

export interface VendorAlert {
  id: string
  type: VendorAlertType
  message: string
  count: number
  actionLabel: string
  actionHref: string
}

export interface Wedding {
  id: string
  coupleNames: string
  date: Date
  location: string
  venue: {
    name: string | null
    isSet: boolean
  }
  status: WeddingSetupStatus
  statusMessage?: string
  statusDetail?: string
  intakeCompleted: boolean
  alerts: VendorAlert[]
  createdAt: Date
}

// Component props
export interface WeddingCardProps {
  wedding: Wedding
  onMenuAction?: (action: string, weddingId: string) => void
  onIntakeAction?: (action: "send" | "fill", weddingId: string) => void
  onAlertAction?: (alertId: string, weddingId: string) => void
}

export interface WeddingCardHeaderProps {
  coupleNames: string
  date: Date
  location: string
  venue: Wedding["venue"]
  onMenuAction?: (action: string) => void
}

export interface WeddingCardStatusProps {
  status: WeddingSetupStatus
  message: string
  detail?: string
}

export interface WeddingCardIntakeProps {
  onSendIntake?: () => void
  onFillIntake?: () => void
}

export interface WeddingCardAlertProps {
  alert: VendorAlert
  onAction?: () => void
}

export interface WeddingListProps {
  weddings: Wedding[]
  onCreateNew?: () => void
}

// Layout props
export interface PageHeaderProps {
  title: string
  subtitle?: string
  className?: string
}

export interface SectionHeaderProps {
  title: string
  actionLabel?: string
  actionIcon?: LucideIcon
  onAction?: () => void
  className?: string
}

export interface DashboardLayoutProps {
  children: React.ReactNode
}

export interface SidebarProps {
  className?: string
}

export interface SidebarNavItemProps {
  item: NavItem
  isCollapsed?: boolean
}
