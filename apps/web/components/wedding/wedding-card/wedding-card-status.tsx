import { Sparkles } from "lucide-react"
import type { WeddingCardStatusProps } from "@/types/wedding"

export function WeddingCardStatus({
  status,
  message,
  detail,
}: WeddingCardStatusProps) {
  if (status !== "importing" && status !== "needs_intake") {
    return null
  }

  return (
    <div className="mt-4 rounded-lg bg-violet-50 px-4 py-3">
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-violet-600" />
        <span className="text-sm font-medium text-violet-900">{message}</span>
      </div>
      {detail && (
        <p className="mt-1 text-sm text-violet-700">{detail}</p>
      )}
    </div>
  )
}
