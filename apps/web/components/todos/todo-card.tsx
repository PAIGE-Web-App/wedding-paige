"use client"

import { useState } from "react"
import { MoreVertical, Pencil, Link as LinkIcon, Trash2, ArrowRight, Building2, UserCircle } from "lucide-react"
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
import { TodoEditDrawer } from "./todo-edit-drawer"
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
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const handleEdit = () => {
        setIsDrawerOpen(true)
        setIsMenuOpen(false)
        onEdit?.(todo)
    }

    const handleSave = (updatedTodo: typeof todo) => {
        onEdit?.(updatedTodo)
    }

    return (
        <>
            <div className="rounded-lg border border-border bg-card p-4">
                <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium">{todo.title}</p>
                        {todo.dueDate && (
                            <p className="text-xs text-muted-foreground">
                                Due: {formatDate(todo.dueDate)}
                            </p>
                        )}
                        <div className="flex items-center gap-2">
                            <span className="text-xs">
                                Assigned:
                            </span>
                            <UserCircle className="h-4 w-4" />
                        </div>
                        {todo.location && (
                            <div className="flex items-center gap-2">
                                <Building2 className="h-4 w-4" />
                                <span className="text-xs">{todo.location}</span>
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
                            <DropdownMenuItem onClick={handleEdit}>
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
                    <div className="mt-4 bg-banner-violet p-3 -mx-4">
                        <div className="flex flex-col gap-2 text-banner-violet-foreground">
                            <div className="mb-2 flex items-center gap-1.5">
                                <SparklesIcon size={10} />
                                <span className="text-xs font-medium">Suggested Update</span>
                            </div>
                            <div className="space-y-1 flex flex-col gap-2">
                                {todo.suggestedUpdates.map((update) => (
                                    <div key={update.id} className="text-xs">
                                        <span>{update.field}:</span>{" "}
                                        <div className="flex items-center gap-1">
                                            <span>{update.oldValue}</span>
                                            <ArrowRight className="h-3 w-3" />{" "}
                                            <span className="font-medium">{update.newValue}</span>
                                        </div>
                                    </div>
                                ))}
                                {todo.suggestedUpdates[0]?.reason && (
                                    <p className="mt-1 text-xs flex flex-col">
                                        <span className="font-medium">Reason:</span>
                                        <span>{todo.suggestedUpdates[0].reason}</span>
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="mt-3 flex flex-col gap-2">
                            <Button
                                size="sm"
                                className="h-6 text-xs"
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
                                className="h-6 border-border text-xs"
                                onClick={() => onViewEmail?.(todo.id)}
                            >
                                View Email
                            </Button>
                        </div>
                    </div>
                )}

                <div className="mt-3 flex flex-wrap gap-1.5">
                    {todo.budgetItems && todo.budgetItems > 0 && (
                        <Badge variant="outline">
                            <LinkIcon className="h-3 w-3" />
                            {todo.budgetItems} Budget item{todo.budgetItems !== 1 ? "s" : ""}
                        </Badge>
                    )}
                    <Badge variant="outline">
                        {todo.category}
                    </Badge>
                    {todo.paymentStatus && (
                        <Badge>
                            <CheckmarkIcon />
                            {todo.paymentStatus}
                        </Badge>
                    )}
                </div>
            </div>
            <TodoEditDrawer
                todo={todo}
                open={isDrawerOpen}
                onOpenChange={setIsDrawerOpen}
                onSave={handleSave}
                onDelete={onDelete}
            />
        </>
    )
}
