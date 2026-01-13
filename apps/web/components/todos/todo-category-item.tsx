"use client"

import { cn } from "@/lib/utils"
import type { TodoCategoryItemProps } from "@/types/todos"

export function TodoCategoryItem({ category, isActive, onClick }: TodoCategoryItemProps) {
    const progressPercentage = category.totalItems > 0
        ? Math.round((category.completedItems / category.totalItems) * 100)
        : 0

    return (
        <button
            onClick={onClick}
            className={cn(
                "w-full rounded-lg px-3 py-2 text-left transition-colors",
                isActive
                    ? "bg-violet-100 text-violet-900"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
        >
            <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-medium">{category.name}</span>
                <span className="text-xs text-muted-foreground">
                    {category.completedItems}/{category.totalItems}
                </span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                <div
                    className={cn(
                        "h-full transition-all",
                        isActive ? "bg-violet-600" : "bg-muted-foreground/30"
                    )}
                    style={{ width: `${progressPercentage}%` }}
                />
            </div>
        </button>
    )
}
