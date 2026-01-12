"use client"

import { Button } from "@/components/ui/button"
import type { WeddingCardAlertProps } from "@/types/wedding"

export function WeddingCardAlert({ alert, onAction }: WeddingCardAlertProps) {
  return (
    <div className="mt-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-orange-400" />
        <span className="text-sm text-muted-foreground">{alert.message}</span>
      </div>
      <Button variant="default" size="sm" onClick={onAction}>
        {alert.actionLabel}
      </Button>
    </div>
  )
}
