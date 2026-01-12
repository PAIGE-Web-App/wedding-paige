import { SidebarNavItem } from "./sidebar-nav-item"
import type { NavItem } from "@/types/wedding"

interface SidebarNavProps {
  items: NavItem[]
  isCollapsed?: boolean
}

export function SidebarNav({ items, isCollapsed = false }: SidebarNavProps) {
  return (
    <nav className="flex flex-col gap-1">
      {items.map((item) => (
        <SidebarNavItem key={item.id} item={item} isCollapsed={isCollapsed} />
      ))}
    </nav>
  )
}
