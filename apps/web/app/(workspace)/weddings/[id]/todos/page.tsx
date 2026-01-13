"use client"

import { useState } from "react"
import { use } from "react"
import { TodosHeader } from "@/components/todos/todos-header"
import { TodosTable } from "@/components/todos/todos-table"
import { TodosFooter } from "@/components/todos/todos-footer"
import { Card } from "@/components/ui/card"
import { mockTodos, mockTodoCategories } from "@/data/mock-data"
import { TODO_STATUSES } from "@/types/todos"
import type { Todo, TodoStatus } from "@/types/todos"

interface TodosPageProps {
    params: Promise<{ id: string }>
}

export default function TodosPage({ params }: TodosPageProps) {
    use(params)
    const [activeCategoryId, setActiveCategoryId] = useState<string | undefined>(
        mockTodoCategories[0]?.id
    )
    const [todos, setTodos] = useState<Todo[]>(mockTodos)

    const filteredTodos = activeCategoryId
        ? todos.filter((todo) => {
            const category = mockTodoCategories.find((c) => c.id === activeCategoryId)
            return category && todo.category === category.name
        })
        : todos

    const handleTodoStatusChange = (todoId: string, newStatus: TodoStatus) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === todoId ? { ...todo, status: newStatus } : todo
            )
        )
    }

    const todosByStatus = TODO_STATUSES.reduce((acc, status) => {
        acc[status] = filteredTodos.filter((todo) => todo.status === status)
        return acc
    }, {} as Record<TodoStatus, Todo[]>)

    return (
        <div className="flex flex-col h-full">
            <div className="px-4 pt-4">
                <TodosHeader
                    totalCount={todos.length}
                    isPrivate={true}
                    onNewTodo={() => console.log("New todo")}
                />
            </div>

            <Card className="flex flex-col gap-0 flex-1 min-h-0 m-4 p-0">
                <TodosTable
                    categories={mockTodoCategories}
                    activeCategoryId={activeCategoryId}
                    onCategorySelect={setActiveCategoryId}
                    onNewCategory={() => console.log("New category")}
                    todos={filteredTodos}
                    todosByStatus={todosByStatus}
                    onTodoAction={(action, todo) => console.log("Todo action:", action, todo)}
                    onTodoStatusChange={handleTodoStatusChange}
                />
            </Card>

            <TodosFooter
                hasDraftChanges={true}
                onShare={() => console.log("Share todos")}
            />
        </div>
    )
}
