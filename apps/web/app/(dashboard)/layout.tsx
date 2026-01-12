import { Sidebar } from "@/components/layout/sidebar/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar className="shrink-0" />
      <main className="flex-1 overflow-y-auto">
        <div className="px-8 py-8">{children}</div>
      </main>
    </div>
  )
}
