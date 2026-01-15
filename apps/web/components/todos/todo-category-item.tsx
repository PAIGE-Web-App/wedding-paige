"use client"

import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { MoreVertical, Pencil, Trash2 } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { TodoCategoryItemProps } from "@/types/todos"

export function TodoCategoryItem({ category, isActive, onClick }: TodoCategoryItemProps) {
    const progressPercentage = category.totalItems > 0
        ? Math.round((category.completedItems / category.totalItems) * 100)
        : 0

    return (
        <div
            onClick={onClick}
            className={cn(
                "w-full rounded-lg px-3 py-2 text-left transition-colors cursor-pointer",
                isActive
                    ? "bg-accent/10"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
        >
            <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-medium">{category.name}</span>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon-sm"
                            className="h-6 w-6"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <Progress
                variant="outline"
                value={progressPercentage}
                className="[&>div]:bg-accent"
            />
            <div className="flex justify-between mt-1">
                <span className="text-xs text-muted-foreground">
                    {progressPercentage}%
                </span>
                <span className="text-xs text-muted-foreground">
                    {category.completedItems}/{category.totalItems}
                </span>
            </div>
        </div>
    )
}
