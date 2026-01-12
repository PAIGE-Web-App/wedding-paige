import { Sidebar } from "./sidebar/sidebar"
import type { DashboardLayoutProps } from "@/types/wedding"

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar className="shrink-0" />
      <main className="flex-1 overflow-y-auto">
        <div className="px-8 py-8">{children}</div>
      </main>
    </div>
  )
}
