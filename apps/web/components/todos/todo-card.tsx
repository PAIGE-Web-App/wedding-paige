"use client"

import { useState } from "react"
import { MoreVertical, Pencil, Link as LinkIcon, Trash2, User, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SparklesIcon } from "@/components/ui/sparkles-icon"
import { CheckmarkIcon } from "@/components/ui/checkmark-icon"
import type { TodoCardProps } from "@/types/todos"

function formatDate(date: Date): string {
    const month = date.toLocaleDateString("en-US", { month: "short" })
    const day = date.getDate()
    const year = date.getFullYear()
    return `${month}. ${day}, ${year}`
}

export function TodoCard({
    todo,
    onEdit,
    onLinkBudgetItem,
    onDelete,
    onApplyUpdate,
    onViewEmail,
}: TodoCardProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
            <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-foreground">{todo.title}</h4>
                    {todo.dueDate && (
                        <p className="mt-1 text-xs text-muted-foreground">
                            Due: {formatDate(todo.dueDate)}
                        </p>
                    )}
                    <div className="mt-2 flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                            {todo.assignedTo ? todo.assignedTo.name : ""}
                        </span>
                    </div>
                    {todo.location && (
                        <div className="mt-1 flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{todo.location}</span>
                        </div>
                    )}
                </div>

                <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon-sm" className="h-6 w-6 shrink-0">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEdit?.(todo)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onLinkBudgetItem?.(todo)}>
                            <LinkIcon className="mr-2 h-4 w-4" />
                            Link Budget Item
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => onDelete?.(todo)}
                            className="text-destructive focus:text-destructive"
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {todo.suggestedUpdates && todo.suggestedUpdates.length > 0 && (
                <div className="mt-4 rounded-md border border-purple-200 bg-purple-50/50 p-3">
                    <div className="mb-2 flex items-center gap-1.5">
                        <SparklesIcon size={10} />
                        <span className="text-xs font-medium text-purple-700">Suggested Update</span>
                    </div>
                    <div className="space-y-1">
                        {todo.suggestedUpdates.map((update) => (
                            <div key={update.id} className="text-xs text-purple-700">
                                <span className="font-medium">{update.field}:</span>{" "}
                                <span>{update.oldValue}</span> →{" "}
                                <span className="font-medium">{update.newValue}</span>
                            </div>
                        ))}
                    </div>
                    {todo.suggestedUpdates[0]?.reason && (
                        <p className="mt-1 text-xs text-purple-700">
                            <span className="font-medium">Reason:</span> {todo.suggestedUpdates[0].reason}
                        </p>
                    )}
                    <div className="mt-3 flex gap-2">
                        <Button
                            size="sm"
                            className="h-7 bg-purple-700 text-xs text-white hover:bg-purple-800"
                            onClick={() => {
                                const firstUpdate = todo.suggestedUpdates?.[0]
                                if (firstUpdate) {
                                    onApplyUpdate?.(todo.id, firstUpdate.id)
                                }
                            }}
                        >
                            Apply Update
                        </Button>
                        <Button
                            size="sm"
                            variant="outline"
                            className="h-7 border-border bg-white text-xs hover:bg-accent"
                            onClick={() => onViewEmail?.(todo.id)}
                        >
                            View Email
                        </Button>
                    </div>
                </div>
            )}

            <div className="mt-3 flex flex-wrap gap-1.5">
                {todo.budgetItems !== undefined && todo.budgetItems > 0 && (
                    <Badge variant="outline" className="text-xs border-gray-300 text-gray-700">
                        <LinkIcon className="h-3 w-3" />
                        {todo.budgetItems} Budget item{todo.budgetItems !== 1 ? "s" : ""}
                    </Badge>
                )}
                <Badge variant="outline" className="text-xs border-amber-300 text-amber-800">
                    {todo.category}
                </Badge>
                {todo.paymentStatus && (
                    <Badge className="text-xs border-transparent bg-blue-600 text-white">
                        <CheckmarkIcon />
                        {todo.paymentStatus}
                    </Badge>
                )}
            </div>
        </div>
    )
}
