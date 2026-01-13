"use client"

import { Search, Calendar, Grid } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import type { TodosHeaderProps } from "@/types/todos"

export function TodosHeader({
    totalCount,
    isPrivate = false,
    onNewTodo,
}: TodosHeaderProps) {
    return (
        <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
                <h1 className="text-2xl font-semibold text-foreground">To-dos</h1>
                <Badge variant="secondary" className="text-xs">
                    {totalCount}
                </Badge>
                {isPrivate && (
                    <Badge variant="outline" className="text-xs">
                        Private
                    </Badge>
                )}
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

            <Button onClick={onNewTodo}>New To-do</Button>
        </div>
    )
}
