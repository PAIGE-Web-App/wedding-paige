"use client"

import { Button } from "@/components/ui/button"
import type { WeddingCardIntakeProps } from "@/types/wedding"

export function WeddingCardIntake({
  onSendIntake,
  onFillIntake,
}: WeddingCardIntakeProps) {
  return (
    <div className="mt-4 rounded-lg border border-border bg-card p-4">
      <h4 className="text-sm font-medium text-foreground">
        Send intake to couple
      </h4>
      <p className="mt-1 text-sm text-muted-foreground">
        This helps Paige personalize the couple&apos;s plan with a defined budget,
        scope, and style.
      </p>
      <div className="mt-3 flex gap-2">
        <Button size="sm" onClick={onSendIntake}>
          Send intake to couple
        </Button>
        <Button variant="outline" size="sm" onClick={onFillIntake}>
          Fill it in yourself
        </Button>
      </div>
    </div>
  )
}
