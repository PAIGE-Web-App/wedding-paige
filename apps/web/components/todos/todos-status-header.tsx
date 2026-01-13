"use client"

import { Info } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { TodoStatus } from "@/types/todos"

interface TodosStatusHeaderProps {
    status: TodoStatus
    count: number
}

export function TodosStatusHeader({ status, count }: TodosStatusHeaderProps) {
    const badgeClassName =
        status === "NOT STARTED" ? "bg-yellow-100 text-yellow-800 border-transparent" :
            status === "IN PROGRESS" ? "bg-blue-100 text-blue-800 border-transparent" :
                "bg-green-100 text-green-800 border-transparent"

    return (
        <div className="px-6 py-3 border-r border-border last:border-r-0 flex items-center gap-2">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {status}
            </h2>
            <Badge variant="secondary" className={`text-xs ${badgeClassName}`}>
                {count}
            </Badge>
            <Info className="h-4 w-4 text-muted-foreground" />
        </div>
    )
}
