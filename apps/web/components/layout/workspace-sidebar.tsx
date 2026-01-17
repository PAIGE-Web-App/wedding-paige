"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { getWorkspaceNavItems, workspaceBottomNavItems } from "@/data/mock-data"
import type { WorkspaceSidebarProps, WorkspaceNavItem } from "@/types/workspace"

function WorkspaceNavItem({ item, isActive }: { item: WorkspaceNavItem; isActive?: boolean }) {
  const Icon = item.icon
  const content = (
    <div
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        isActive
          ? "bg-violet-100 text-violet-900"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
        !item.href && "cursor-default opacity-70"
      )}
    >
      <Icon className="h-5 w-5 shrink-0" />
      <span className="flex-1">{item.label}</span>
      {item.badge && (
        <span
          className={cn(
            "rounded px-1.5 py-0.5 text-xs font-medium",
            item.badgeVariant === "notReady"
              ? "bg-red-100 text-red-700"
              : "bg-muted text-muted-foreground"
          )}
        >
          {item.badge}
        </span>
      )}
    </div>
  )

  if (item.href) {
    return <Link href={item.href}>{content}</Link>
  }

  return content
}

export function WorkspaceSidebar({ weddingId, className }: WorkspaceSidebarProps) {
  const pathname = usePathname()
  const navItems = getWorkspaceNavItems(weddingId)

  return (
    <aside
      className={cn(
        "flex h-full w-56 flex-col border-r border-border bg-sidebar",
        className
      )}
    >
      <div className="flex flex-1 flex-col justify-between px-3 py-4">
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = item.href ? pathname === item.href : false
            return <WorkspaceNavItem key={item.id} item={item} isActive={isActive} />
          })}
        </nav>

        <div className="flex flex-col gap-1">
          {workspaceBottomNavItems.map((item) => {
            const isActive = item.href ? pathname === item.href : false
            return <WorkspaceNavItem key={item.id} item={item} isActive={isActive} />
          })}

          <div className="mt-4 flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-2">
            <Sparkles className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">STARTER</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
