"use client"

import { useState } from "react"
import { Settings2 } from "lucide-react"
import { InboxTabs } from "./inbox-tabs"
import { ContactList } from "./contact-list"
import { ThreadList } from "./thread-list"
import type { InboxContainerProps } from "@/types/workspace"

export function InboxContainer({
  contacts,
  threads,
  selectedContactId: initialSelectedId,
  onContactSelect,
}: InboxContainerProps) {
  const [activeTab, setActiveTab] = useState<"all" | "needsReview">("all")
  const [selectedContactId, setSelectedContactId] = useState(
    initialSelectedId || contacts[0]?.id
  )

  const handleContactSelect = (contactId: string) => {
    setSelectedContactId(contactId)
    onContactSelect?.(contactId)
  }

  // Filter threads by selected contact
  const filteredThreads = threads.filter(
    (thread) => thread.contactId === selectedContactId
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Inbox</h2>
        <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <Settings2 className="h-4 w-4" />
          Routing Rules
        </button>
      </div>

      <InboxTabs
        activeTab={activeTab}
        messageCount={threads.length}
        onTabChange={setActiveTab}
      />

      <div className="mt-4 grid grid-cols-[280px_1fr] gap-6">
        <ContactList
          contacts={contacts}
          selectedContactId={selectedContactId}
          onContactSelect={handleContactSelect}
        />
        <ThreadList threads={filteredThreads} />
      </div>
    </div>
  )
}
