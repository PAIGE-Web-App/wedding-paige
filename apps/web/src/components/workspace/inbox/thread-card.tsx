"use client"

import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DetectedUpdate } from "./detected-update"
import type { ThreadCardProps } from "@/types/workspace"

function formatDate(date: Date): string {
  const day = date.toLocaleDateString("en-US", { weekday: "long" })
  const dateStr = date.toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "2-digit",
  })
  return `${day} ${dateStr}`
}

export function ThreadCard({ thread, onViewEmails }: ThreadCardProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-foreground">{thread.subject}</h4>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {formatDate(thread.date)}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">{thread.preview}</p>
        </div>
        <Button variant="outline" size="sm" onClick={onViewEmails}>
          View Emails
        </Button>
      </div>

      {thread.hasDetectedUpdates && thread.detectedUpdates && thread.detectedUpdates.length > 0 && (
        <div className="mt-4">
          <div className="flex items-center gap-2 text-sm">
            <Sparkles className="h-4 w-4 text-violet-600" />
            <span className="font-medium text-foreground">Detected Updates</span>
            <span className="text-muted-foreground">{thread.detectedUpdates.length}</span>
          </div>
          <div className="mt-2 space-y-2">
            {thread.detectedUpdates.map((update) => (
              <DetectedUpdate key={update.id} update={update} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
