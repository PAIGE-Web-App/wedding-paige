"use client"

import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { WeddingCardHeaderProps } from "@/types/wedding"

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export function WeddingCardHeader({
  coupleNames,
  date,
  location,
  venue,
  onMenuAction,
}: WeddingCardHeaderProps) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <h3 className="text-lg font-semibold text-foreground">{coupleNames}</h3>
        <p className="mt-0.5 text-sm text-muted-foreground">
          {formatDate(date)} &bull; {location}
        </p>
        {!venue.isSet && (
          <button className="mt-0.5 text-sm font-medium text-orange-500 hover:underline">
            Wedding Venue not set
          </button>
        )}
        {venue.isSet && venue.name && (
          <p className="mt-0.5 text-sm text-muted-foreground">{venue.name}</p>
        )}
      </div>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => onMenuAction?.("menu")}
      >
        <MoreHorizontal className="h-5 w-5" />
      </Button>
    </div>
  )
}
