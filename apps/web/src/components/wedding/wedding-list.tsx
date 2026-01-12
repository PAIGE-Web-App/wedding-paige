"use client"

import { SectionHeader } from "@/components/layout/section-header"
import { WeddingCard } from "./wedding-card/wedding-card"
import type { WeddingListProps } from "@/types/wedding"

export function WeddingList({ weddings, onCreateNew }: WeddingListProps) {
  return (
    <div>
      <SectionHeader
        title="Your Weddings"
        actionLabel="New Wedding"
        onAction={onCreateNew}
      />
      <div className="mt-4 space-y-4">
        {weddings.map((wedding) => (
          <WeddingCard key={wedding.id} wedding={wedding} />
        ))}
      </div>
    </div>
  )
}
