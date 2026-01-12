"use client"

import { cn } from "@/lib/utils"
import type { InboxTabsProps } from "@/types/workspace"

export function InboxTabs({ activeTab, messageCount, onTabChange }: InboxTabsProps) {
  return (
    <div className="flex items-center gap-1 rounded-lg border border-border bg-muted/30 p-1">
      <button
        onClick={() => onTabChange?.("all")}
        className={cn(
          "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
          activeTab === "all"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        All Messages{" "}
        <span className="ml-1 text-muted-foreground">{messageCount}</span>
      </button>
      <button
        onClick={() => onTabChange?.("needsReview")}
        className={cn(
          "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
          activeTab === "needsReview"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        Needs Review
      </button>
    </div>
  )
}
