"use client"

import { Plus } from "lucide-react"
import { ThreadCard } from "./thread-card"
import type { ThreadListProps } from "@/types/workspace"

export function ThreadList({ threads, onNewThread }: ThreadListProps) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between pb-3">
        <h3 className="text-sm font-medium text-foreground">Threads</h3>
        <button
          onClick={onNewThread}
          className="flex items-center gap-1 text-sm text-violet-600 hover:text-violet-700"
        >
          <Plus className="h-4 w-4" />
          New Thread
        </button>
      </div>
      <div className="flex flex-col gap-3">
        {threads.map((thread) => (
          <ThreadCard key={thread.id} thread={thread} />
        ))}
      </div>
    </div>
  )
}
