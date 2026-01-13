"use client"

import { Plus } from "lucide-react"
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
                <div className="px-6 py-3 border-r border-border flex items-center justify-between gap-2">
                    <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Categories
                    </h2>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-5.5 px-2 text-xs"
                        onClick={onNewCategory}
                    >
                        <Plus className="h-3 w-3" />
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
