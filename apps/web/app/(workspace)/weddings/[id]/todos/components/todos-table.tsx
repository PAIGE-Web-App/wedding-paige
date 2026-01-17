"use client"

import { useMemo } from "react"
import { CirclePlus, Info, LayoutGrid } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"
import { TodosCategoriesSidebar } from "./todos-categories-sidebar"
import { TodosKanbanBoard } from "./todos-kanban-board"
import { TODO_STATUSES } from "@/types/todos"
import type { Todo, TodoCategory, TodoStatus } from "@/types/todos"
import { Badge } from "@/components/ui/badge"

interface TodosTableProps {
    categories: TodoCategory[]
    activeCategoryId?: string
    onCategorySelect?: (categoryId: string) => void
    onNewCategory?: () => void
    todos: Todo[]
    onTodoAction?: (action: string, todo: Todo) => void
    onTodoStatusChange?: (todoId: string, newStatus: TodoStatus) => void
}

export function TodosTable({
    categories,
    activeCategoryId,
    onCategorySelect,
    onNewCategory,
    todos,
    onTodoAction,
    onTodoStatusChange,
}: TodosTableProps) {
    const filteredTodos = useMemo(() => {
        if (!activeCategoryId) return todos
        if (activeCategoryId === "overview") return todos

        const category = categories.find((c) => c.id === activeCategoryId)
        return category
            ? todos.filter((todo) => todo.category === category.name)
            : todos
    }, [todos, activeCategoryId, categories])

    const todosByStatus = useMemo(() => {
        return TODO_STATUSES.reduce((acc, status) => {
            acc[status] = filteredTodos.filter((todo) => todo.status === status)
            return acc
        }, {} as Record<TodoStatus, Todo[]>)
    }, [filteredTodos])
    return (
        <CardContent className="flex flex-col gap-0 flex-1 min-h-0 p-0 overflow-hidden">
            <div className="grid grid-cols-[250px_1fr_1fr_1fr] border-b border-border flex-shrink-0">
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
                {TODO_STATUSES.map((status, index) => (
                    <div key={index} className="px-4 py-3 border-r border-border last:border-r-0 flex items-center gap-2 justify-between">
                        <div className="flex items-center gap-2">
                            <div
                                className={`w-[10px] h-[10px] rounded-full border ${index === 0 ? "bg-white" :
                                    index === 1 ? "bg-[#FFD18C]" :
                                        "bg-[#DCFCE8]"
                                    }`}
                            />
                            <span className="uppercase text-muted-foreground text-sm font-medium">
                                {status}
                            </span>
                            <Info className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <Badge variant="secondary" className={`text-xs ${index === 0 ? "bg-accent/10" :
                            index === 1 ? "bg-[#FEF4C7]" :
                                "bg-[#DCFCE8]"
                            }`}>
                            {todosByStatus[status]?.length || 0}
                        </Badge>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-[250px_1fr_1fr_1fr] flex-1 min-h-0 overflow-hidden">
                <TodosCategoriesSidebar
                    categories={categories}
                    activeCategoryId={activeCategoryId}
                    onCategorySelect={onCategorySelect}
                    todos={todos}
                />

                <div className="col-span-3 min-h-0 overflow-hidden">
                    <TodosKanbanBoard
                        todos={filteredTodos}
                        todosByStatus={todosByStatus}
                        onTodoAction={onTodoAction}
                        onTodoStatusChange={onTodoStatusChange}
                    />
                </div>
            </div>
        </CardContent>
    )
}
