"use client"

import {
    DndContext,
    DragOverlay,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
    type DragStartEvent,
} from "@dnd-kit/core"
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable"
import { useState } from "react"
import { TodoKanbanColumn } from "./todo-kanban-column"
import { TodoCard } from "./todo-card"
import { TODO_STATUSES } from "@/types/todos"
import type { Todo, TodoStatus } from "@/types/todos"

interface TodosKanbanBoardProps {
    todos: Todo[]
    todosByStatus: Record<TodoStatus, Todo[]>
    onTodoAction?: (action: string, todo: Todo) => void
    onTodoStatusChange?: (todoId: string, newStatus: TodoStatus) => void
}

export function TodosKanbanBoard({
    todos,
    todosByStatus,
    onTodoAction,
    onTodoStatusChange,
}: TodosKanbanBoardProps) {
    const [activeId, setActiveId] = useState<string | null>(null)
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id as string)
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        setActiveId(null)

        if (!over) return

        const activeId = active.id as string
        const overId = over.id as string

        const activeTodo = todos.find((t) => t.id === activeId)
        if (!activeTodo) return

        if (overId.startsWith("column-")) {
            const newStatus = overId.replace("column-", "") as TodoStatus
            if (newStatus !== activeTodo.status) {
                onTodoStatusChange?.(activeId, newStatus)
            }
        } else {
            const overTodo = todos.find((t) => t.id === overId)
            if (overTodo) {
                if (overTodo.status !== activeTodo.status) {
                    onTodoStatusChange?.(activeId, overTodo.status)
                }
            }
        }
    }

    const activeTodo = activeId ? todos.find((t) => t.id === activeId) : null

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div className="grid grid-cols-3 h-full">
                {TODO_STATUSES.map((status) => (
                    <TodoKanbanColumn
                        key={status}
                        status={status}
                        todos={todosByStatus[status] || []}
                        onTodoAction={onTodoAction}
                    />
                ))}
            </div>
            <DragOverlay>
                {activeTodo ? (
                    <div className="opacity-50">
                        <TodoCard
                            todo={activeTodo}
                            onEdit={() => { }}
                            onLinkBudgetItem={() => { }}
                            onDelete={() => { }}
                            onApplyUpdate={() => { }}
                            onViewEmail={() => { }}
                        />
                    </div>
                ) : null}
            </DragOverlay>
        </DndContext>
    )
}
