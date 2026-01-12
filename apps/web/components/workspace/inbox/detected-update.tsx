"use client"

import { MoreHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { DetectedUpdateProps } from "@/types/workspace"

export function DetectedUpdate({ update, onAction }: DetectedUpdateProps) {
  return (
    <div className="flex items-center justify-between rounded-md border border-border bg-muted/30 p-3">
      <div>
        <p className="text-sm font-medium text-foreground">{update.title}</p>
        <p className="text-xs text-muted-foreground">
          {update.amount} {update.estimate && `• ${update.estimate}`}
        </p>
        <Badge variant="secondary" className="mt-1 text-xs bg-blue-100 text-blue-800">
          {update.type}
        </Badge>
      </div>
      <Button variant="ghost" size="icon-sm" onClick={onAction}>
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </div>
  )
}
