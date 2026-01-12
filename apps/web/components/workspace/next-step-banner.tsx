"use client"

import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { NextStepBannerProps } from "@/types/workspace"

export function NextStepBanner({
  title,
  description,
  tip,
  primaryAction,
  secondaryAction,
}: NextStepBannerProps) {
  return (
    <div className="rounded-lg border border-violet-200 bg-violet-50 p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-violet-600" />
            <h3 className="text-sm font-semibold text-violet-900">
              Next step: {title}
            </h3>
          </div>
          <p className="mt-1 text-sm text-violet-700">{description}</p>
          {tip && (
            <p className="mt-1 text-xs text-violet-600">Tip: {tip}</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          {secondaryAction && (
            <Button
              variant="outline"
              size="sm"
              onClick={secondaryAction.onClick}
              className="border-violet-300 bg-white text-violet-700 hover:bg-violet-100"
            >
              {secondaryAction.label}
            </Button>
          )}
          {primaryAction && (
            <Button
              size="sm"
              onClick={primaryAction.onClick}
              className="bg-violet-700 text-white hover:bg-violet-800"
            >
              {primaryAction.label}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
