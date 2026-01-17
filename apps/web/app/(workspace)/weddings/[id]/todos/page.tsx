"use client"

import { useState } from "react"
import { use } from "react"
import { Search, Calendar, Grid } from "lucide-react"
import { TodosTable } from "./components/todos-table"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { mockTodos, mockTodoCategories } from "@/data/mock-data"
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

    const handleTodoStatusChange = (todoId: string, newStatus: TodoStatus) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === todoId ? { ...todo, status: newStatus } : todo
            )
        )
    }

    return (
        <div className="flex flex-col h-full">
            <div className="px-4 pt-4">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-semibold text-foreground">To-dos</h1>
                        <Badge variant="secondary" className="text-xs">
                            {todos.length}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                            Private
                        </Badge>
                    </div>

                    <div className="flex flex-1 items-center justify-center gap-2">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <Grid className="h-5 w-5 text-muted-foreground" />
                        <div className="relative w-full max-w-md">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Search to-dos"
                                className="pl-9"
                            />
                        </div>
                    </div>

                    <Button onClick={() => console.log("New todo")}>New To-do</Button>
                </div>
            </div>

            <Card className="flex flex-col gap-0 flex-1 min-h-0 m-4 p-0">
                <TodosTable
                    categories={mockTodoCategories}
                    activeCategoryId={activeCategoryId}
                    onCategorySelect={setActiveCategoryId}
                    onNewCategory={() => console.log("New category")}
                    todos={todos}
                    onTodoAction={(action, todo) => console.log("Todo action:", action, todo)}
                    onTodoStatusChange={handleTodoStatusChange}
                />
            </Card>

            <div className="bg-white w-full flex items-center border-t border-border py-2 px-4 justify-between">
                <p className="text-sm text-muted-foreground">
                    Draft changes not yet shared with Couple.
                </p>
                <Button
                    variant="default"
                    onClick={() => console.log("Share todos")}
                >
                    Share To-dos with Couple
                </Button>
            </div>
        </div>
    )
}
