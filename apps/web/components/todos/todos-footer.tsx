import { Button } from "@/components/ui/button"
import type { TodosFooterProps } from "@/types/todos"

export function TodosFooter({ hasDraftChanges = false, onShare }: TodosFooterProps) {
    return (
        <div className={`bg-white w-full flex items-center border-t border-border py-2 px-4 ${hasDraftChanges ? 'justify-between' : 'justify-center'}`}>
            {hasDraftChanges && (
                <p className="text-sm text-muted-foreground">
                    Draft changes not yet shared with Couple.
                </p>
            )}
            <Button
                variant="default"
                className="bg-amber-700 hover:bg-amber-800 text-white"
                onClick={onShare}
            >
                Share To-dos with Couple
            </Button>
        </div>
    )
}
