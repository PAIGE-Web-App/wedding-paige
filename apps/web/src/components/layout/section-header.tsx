"use client"

import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type { SectionHeaderProps } from "@/types/wedding"

export function SectionHeader({
  title,
  actionLabel,
  actionIcon: ActionIcon,
  onAction,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <h2 className="text-lg font-medium text-foreground">{title}</h2>
      {actionLabel && (
        <Button variant="outline" size="sm" onClick={onAction}>
          {ActionIcon ? (
            <ActionIcon className="mr-1.5 h-4 w-4" />
          ) : (
            <Plus className="mr-1.5 h-4 w-4" />
          )}
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
