import { cn } from "@/lib/utils"
import { SidebarLogo } from "./sidebar-logo"
import { SidebarNav } from "./sidebar-nav"
import { mainNavItems, bottomNavItems } from "@/data/mock-data"
import type { SidebarProps } from "@/types/wedding"

export function Sidebar({ className }: SidebarProps) {
  return (
    <aside
      className={cn(
        "flex h-screen w-56 flex-col border-r border-border bg-sidebar",
        className
      )}
    >
      <SidebarLogo />

      <div className="flex flex-1 flex-col justify-between px-3 py-2">
        <SidebarNav items={mainNavItems} />

        <SidebarNav items={bottomNavItems} />
      </div>
    </aside>
  )
}
