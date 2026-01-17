"use client"

import { TodoCategoryItem } from "./todo-category-item"
import type { TodoCategory } from "@/types/todos"

interface TodosCategoriesSidebarProps {
    categories: TodoCategory[]
    activeCategoryId?: string
    onCategorySelect?: (categoryId: string) => void
}

export function TodosCategoriesSidebar({
    categories,
    activeCategoryId,
    onCategorySelect,
}: TodosCategoriesSidebarProps) {
    return (
        <div className="h-full border-r border-border p-4 overflow-y-auto">
            <div className="space-y-1">
                {categories.map((category) => (
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
