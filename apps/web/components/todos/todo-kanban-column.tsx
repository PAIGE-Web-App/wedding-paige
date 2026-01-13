"use client"

import { Info } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { SortableTodoCard } from "./sortable-todo-card"
import type { TodoKanbanColumnProps } from "@/types/todos"

export function TodoKanbanColumn({ status, todos, onTodoAction }: TodoKanbanColumnProps) {
    const { setNodeRef } = useDroppable({
        id: `column-${status}`,
    })

    return (
        <div
            ref={setNodeRef}
            className="flex flex-col h-full border-r border-border last:border-r-0 px-6 py-4"
        >
            <SortableContext items={todos.map((t) => t.id)} strategy={verticalListSortingStrategy}>
                <div className="flex flex-col gap-3 flex-1 overflow-y-auto">
                    {todos.map((todo) => (
                        <SortableTodoCard
                            key={todo.id}
                            todo={todo}
                            onEdit={(todo) => onTodoAction?.("edit", todo)}
                            onLinkBudgetItem={(todo) => onTodoAction?.("linkBudget", todo)}
                            onDelete={(todo) => onTodoAction?.("delete", todo)}
                            onApplyUpdate={(todoId, updateId) =>
                                onTodoAction?.("applyUpdate", { id: todoId, updateId } as any)
                            }
                            onViewEmail={(todoId) =>
                                onTodoAction?.("viewEmail", { id: todoId } as any)
                            }
                        />
                    ))}
                </div>
            </SortableContext>
        </div>
    )
}
