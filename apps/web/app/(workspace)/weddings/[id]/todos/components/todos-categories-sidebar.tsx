"use client"

import { TodoCategoryItem } from "./todo-category-item"
import type { TodoCategory, Todo } from "@/types/todos"

interface TodosCategoriesSidebarProps {
    categories: TodoCategory[]
    activeCategoryId?: string
    onCategorySelect?: (categoryId: string) => void
    todos: Todo[]
}

export function TodosCategoriesSidebar({
    categories,
    activeCategoryId,
    onCategorySelect,
    todos,
}: TodosCategoriesSidebarProps) {
    const categoriesWithCounts = categories.map((category) => {
        let categoryTodos: Todo[]

        if (category.id === "overview") {
            categoryTodos = todos
        } else {
            categoryTodos = todos.filter((todo) => todo.category === category.name)
        }

        const totalItems = categoryTodos.length
        const completedItems = categoryTodos.filter(
            (todo) => todo.status === "DONE"
        ).length

        return {
            ...category,
            totalItems,
            completedItems,
        }
    })

    return (
        <div className="h-full min-h-0 border-r border-border p-4 overflow-y-auto">
            <div className="space-y-1">
                {categoriesWithCounts.map((category) => (
                    <TodoCategoryItem
                        key={category.id}
                        category={category}
                        isActive={activeCategoryId === category.id}
                        onClick={() => onCategorySelect?.(category.id)}
                    />
                ))}
            </div>
        </div>
    )
}
