"use client"

import { ChevronDown, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { WorkspaceHeaderProps } from "@/types/workspace"

export function WorkspaceHeader({ coupleNames }: WorkspaceHeaderProps) {
  return (
    <header className="flex h-14 items-center justify-between border-b border-border bg-card px-6">
      <div className="flex items-center gap-6">
        <span className="text-xl font-semibold text-foreground">
          P<span className="text-xs align-top">x</span>
        </span>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Viewing:</span>
          <button className="flex items-center gap-1 rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium hover:bg-muted">
            {coupleNames}&apos;s Wedding
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      <Button size="sm">
        <Plus className="mr-1.5 h-4 w-4" />
        New Plan
      </Button>
    </header>
  )
}
