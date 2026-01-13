export type TodoStatus = "NOT STARTED" | "IN PROGRESS" | "DONE"

export const TODO_STATUSES: TodoStatus[] = ["NOT STARTED", "IN PROGRESS", "DONE"]

export type TodoCategory = {
    id: string
    name: string
    progress: number
    totalItems: number
    completedItems: number
}

export type SuggestedUpdate = {
    id: string
    field: string
    oldValue: string
    newValue: string
    reason: string
}

export type Todo = {
    id: string
    title: string
    dueDate?: Date
    assignedTo?: {
        id: string
        name: string
        avatar?: string
    }
    location?: string
    category: string
    status: TodoStatus
    budgetItems?: number
    paymentStatus?: "Partially Paid" | "Paid" | "Unpaid"
    suggestedUpdates?: SuggestedUpdate[]
}

export interface TodoCardProps {
    todo: Todo
    onEdit?: (todo: Todo) => void
    onLinkBudgetItem?: (todo: Todo) => void
    onDelete?: (todo: Todo) => void
    onApplyUpdate?: (todoId: string, updateId: string) => void
    onViewEmail?: (todoId: string) => void
}

export interface TodoKanbanColumnProps {
    status: TodoStatus
    todos: Todo[]
    onTodoAction?: (action: string, todo: Todo) => void
}

export interface TodoCategoryItemProps {
    category: TodoCategory
    isActive?: boolean
    onClick?: () => void
}

export interface TodosHeaderProps {
    totalCount: number
    isPrivate?: boolean
    onNewTodo?: () => void
}

export interface TodosFooterProps {
    hasDraftChanges?: boolean
    onShare?: () => void
}
