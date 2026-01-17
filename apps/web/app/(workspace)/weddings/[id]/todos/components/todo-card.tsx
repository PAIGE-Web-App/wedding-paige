"use client"

import { useState } from "react"
import { MoreVertical, Pencil, Link as LinkIcon, Trash2, Building2, UserCircle } from "lucide-react"
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { TodoEditDrawer } from "./todo-edit-drawer"
import type { TodoCardProps } from "@/types/todos"
import { Separator } from "@/components/ui/separator"
import { Card, CardHeader, CardAction, CardFooter, CardContent } from "@/components/ui/card"

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

    const cardContent = (
        <Card className="w-full">
            <CardHeader>
                <p className="text-sm font-medium">{todo.title}</p>
                {todo.dueDate && (
                    <p className="text-sm text-muted-foreground">
                        Due: {formatDate(todo.dueDate)}
                    </p>
                )}
                <div className="flex items-center gap-2">
                    <span className="text-xs">
                        Assigned:
                    </span>
                    <UserCircle className="h-4 w-4" />
                </div>

                <CardAction>
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
                </CardAction>

            </CardHeader>
            <CardContent>
                <Separator className="mb-4" />
                {todo.location && (
                    <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4" />
                        <span className="text-xs">{todo.location}</span>
                    </div>
                )}
            </CardContent>

            <CardFooter className="flex flex-wrap gap-1.5">
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
            </CardFooter>
        </Card>
    )

    return (
        <>
            {todo.suggestedUpdates && todo.suggestedUpdates.length > 0 ? (
                <Alert variant="info" className="space-y-4">
                    <AlertTitle className="flex items-center gap-2">
                        <SparklesIcon size={10} />
                        <span className="text-sm font-semibold">Venue Booking date moved</span>
                    </AlertTitle>
                    <AlertDescription>
                        {cardContent}
                        <div className="mt-3 flex flex gap-2">
                            <Button
                                size="sm"
                                variant="outline"
                                className="h-6 border-border text-xs"
                                onClick={() => onViewEmail?.(todo.id)}
                            >
                                View Email
                            </Button>
                            <Button
                                size="sm"
                                className="h-6 text-xs text-white hover:bg-accent/90"
                                onClick={() => {
                                    const firstUpdate = todo.suggestedUpdates?.[0]
                                    if (firstUpdate) {
                                        onApplyUpdate?.(todo.id, firstUpdate.id)
                                    }
                                }}
                            >
                                Apply Update
                            </Button>
                        </div>
                    </AlertDescription>
                </Alert>
            ) : (
                cardContent
            )}
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
