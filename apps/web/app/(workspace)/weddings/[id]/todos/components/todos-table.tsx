"use client"

import { CirclePlus, LayoutGrid } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"
import { TodosCategoriesSidebar } from "./todos-categories-sidebar"
import { TodosKanbanBoard } from "./todos-kanban-board"
import { TodosStatusHeader } from "./todos-status-header"
import { TODO_STATUSES } from "@/types/todos"
import type { Todo, TodoCategory, TodoStatus } from "@/types/todos"

interface TodosTableProps {
    categories: TodoCategory[]
    activeCategoryId?: string
    onCategorySelect?: (categoryId: string) => void
    onNewCategory?: () => void
    todos: Todo[]
    todosByStatus: Record<TodoStatus, Todo[]>
    onTodoAction?: (action: string, todo: Todo) => void
    onTodoStatusChange?: (todoId: string, newStatus: TodoStatus) => void
}

export function TodosTable({
    categories,
    activeCategoryId,
    onCategorySelect,
    onNewCategory,
    todos,
    todosByStatus,
    onTodoAction,
    onTodoStatusChange,
}: TodosTableProps) {
    return (
        <CardContent className="flex flex-col gap-0 flex-1 min-h-0 p-0">
            <div className="grid grid-cols-[250px_1fr_1fr_1fr] border-b border-border">
                <div className="px-4 py-3 border-r border-border flex items-center justify-between gap-2 ">
                    <div className="flex items-center gap-1">
                        <LayoutGrid className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                            Categories
                        </span>
                    </div>
                    <Button
                        variant="outline"
                        onClick={onNewCategory}
                        className="gap-1"
                    >
                        <CirclePlus />
                        New
                    </Button>
                </div>
                {TODO_STATUSES.map((status) => (
                    <TodosStatusHeader
                        key={status}
                        status={status}
                        count={todosByStatus[status]?.length || 0}
                    />
                ))}
            </div>

            <div className="grid grid-cols-[250px_1fr_1fr_1fr] flex-1 min-h-0">
                <TodosCategoriesSidebar
                    categories={categories}
                    activeCategoryId={activeCategoryId}
                    onCategorySelect={onCategorySelect}
                />

                <div className="col-span-3 min-h-0">
                    <TodosKanbanBoard
                        todos={todos}
                        todosByStatus={todosByStatus}
                        onTodoAction={onTodoAction}
                        onTodoStatusChange={onTodoStatusChange}
                    />
                </div>
            </div>
        </CardContent>
    )
}
