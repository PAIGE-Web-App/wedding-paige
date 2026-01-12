"use client"

import { CheckCircle2, Calendar, MapPin } from "lucide-react"
import type { WeddingSetupStatus } from "@/types/wedding"

interface WeddingCardSummaryProps {
  status: WeddingSetupStatus
}

export function WeddingCardSummary({ status }: WeddingCardSummaryProps) {
  if (status === "importing" || status === "needs_intake") {
    return null
  }

  return (
    <div className="mt-4 rounded-lg border border-border bg-muted/30 px-4 py-3">
      <div className="flex items-center gap-2">
        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
        <span className="text-sm font-medium text-foreground">
          {status === "complete" ? "All set up and ready" : "Ready to plan"}
        </span>
      </div>
      <div className="mt-2 flex gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          <span>Timeline on track</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          <span>Vendors confirmed</span>
        </div>
      </div>
    </div>
  )
}
