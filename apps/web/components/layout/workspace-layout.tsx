import { WorkspaceHeader } from "./workspace-header"
import { WorkspaceSidebar } from "./workspace-sidebar"
import type { WorkspaceLayoutProps } from "@/types/workspace"

export function WorkspaceLayout({ weddingId, coupleNames, children }: WorkspaceLayoutProps) {
  return (
    <div className="flex h-screen flex-col bg-background">
      <WorkspaceHeader weddingId={weddingId} coupleNames={coupleNames} />
      <div className="flex flex-1 overflow-hidden">
        <WorkspaceSidebar weddingId={weddingId} />
        <main className="flex-1 overflow-y-auto">
          <div className="px-8 py-6">{children}</div>
        </main>
      </div>
    </div>
  )
}
