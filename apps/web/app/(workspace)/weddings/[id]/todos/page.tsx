"use client"

import { useState } from "react"
import { use } from "react"
import { Search, Calendar, Kanban } from "lucide-react"
import { TodosTable } from "./components/todos-table"
import { Calendar as TodoCalendar } from "@/components/calendar"
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
    const [viewMode, setViewMode] = useState<"kanban" | "calendar">("kanban")
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
        <div className="flex flex-col h-full overflow-hidden">
            <div className="px-4 pt-4 flex-shrink-0">
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

                    <div className="flex items-center gap-2 flex-1 justify-end">
                        <div className="flex items-center gap-0 border border-border rounded-md">
                            <button
                                onClick={() => setViewMode("kanban")}
                                className={`flex items-center justify-center p-2 px-3 rounded-l-md transition-colors ${viewMode === "kanban"
                                    ? "bg-accent/10"
                                    : "bg-transparent hover:bg-muted/50"
                                    }`}
                            >
                                <Kanban className="h-4 w-4 text-muted-foreground" />
                            </button>
                            <button
                                onClick={() => setViewMode("calendar")}
                                className={`flex items-center justify-center p-2 px-3 rounded-r-md transition-colors ${viewMode === "calendar"
                                    ? "bg-accent/10"
                                    : "bg-transparent hover:bg-muted/50"
                                    }`}
                            >
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                            </button>
                        </div>

                        <div className="relative flex-1 max-w-[300px]">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Search to-dos"
                                className="pl-9 bg-white w-full"
                            />
                        </div>
                        <Button onClick={() => console.log("New todo")}>New To-do</Button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-0 flex-1 min-h-0 m-4 p-0 overflow-hidden">
                {viewMode === "kanban" ? (
                    <Card className="flex flex-col gap-0 flex-1 min-h-0 p-0 overflow-hidden">
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
                ) : (
                    <TodoCalendar />
                )}
            </div>

            <div className="bg-white w-full flex items-center border-t border-border py-2 px-4 justify-between flex-shrink-0">
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
