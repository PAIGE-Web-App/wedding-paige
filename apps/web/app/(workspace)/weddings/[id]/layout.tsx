import { notFound } from "next/navigation"
import { WorkspaceHeader } from "@/components/layout/workspace-header"
import { WorkspaceSidebar } from "@/components/layout/workspace-sidebar"
import { mockWeddings } from "@/data/mock-data"

interface WorkspaceLayoutProps {
  children: React.ReactNode
  params: Promise<{ id: string }>
}

export default async function WorkspaceLayout({
  children,
  params,
}: WorkspaceLayoutProps) {
  const { id } = await params
  const wedding = mockWeddings.find((w) => w.id === id)

  if (!wedding) {
    notFound()
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      <WorkspaceHeader weddingId={id} coupleNames={wedding.coupleNames} />
      <div className="flex flex-1 overflow-hidden">
        <WorkspaceSidebar weddingId={id} />
        <main className="flex-1 overflow-y-auto">
          <div className="px-8 py-6">{children}</div>
        </main>
      </div>
    </div>
  )
}
