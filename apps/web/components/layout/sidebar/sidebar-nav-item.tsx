import Link from "next/link"
import { cn } from "@/lib/utils"
import type { SidebarNavItemProps } from "@/types/wedding"

export function SidebarNavItem({ item, isCollapsed = false }: SidebarNavItemProps) {
  const Icon = item.icon

  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        item.isActive
          ? "bg-violet-100 text-violet-900"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      <Icon className="h-5 w-5 shrink-0" />
      {!isCollapsed && <span>{item.label}</span>}
      {item.badge && !isCollapsed && (
        <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs text-destructive-foreground">
          {item.badge}
        </span>
      )}
    </Link>
  )
}
