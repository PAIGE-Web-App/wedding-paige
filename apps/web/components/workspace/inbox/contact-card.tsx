"use client"

import { Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import type { ContactCardProps } from "@/types/workspace"

const typeColors: Record<string, string> = {
  Venue: "bg-amber-100 text-amber-800",
  Florist: "bg-green-100 text-green-800",
  Photography: "bg-blue-100 text-blue-800",
  Catering: "bg-orange-100 text-orange-800",
  DJ: "bg-purple-100 text-purple-800",
  Other: "bg-gray-100 text-gray-800",
}

export function ContactCard({ contact, isSelected, onClick }: ContactCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full rounded-lg border p-3 text-left transition-colors",
        isSelected
          ? "border-violet-300 bg-violet-50"
          : "border-border bg-card hover:bg-muted/50"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h4 className="truncate text-sm font-medium text-foreground">
            {contact.name}
          </h4>
          <Badge
            variant="secondary"
            className={cn("mt-1 text-xs", typeColors[contact.type] || typeColors.Other)}
          >
            {contact.type}
          </Badge>
        </div>
      </div>
      <p className="mt-2 truncate text-sm text-muted-foreground">
        {contact.subject}
      </p>
      {contact.suggestionsCount && contact.suggestionsCount > 0 && (
        <div className="mt-2 flex items-center gap-1 text-xs text-violet-600">
          <Sparkles className="h-3 w-3" />
          <span>{contact.suggestionsCount} suggestions</span>
        </div>
      )}
    </button>
  )
}
