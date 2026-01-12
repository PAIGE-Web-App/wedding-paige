"use client"

import { Plus } from "lucide-react"
import { ContactCard } from "./contact-card"
import type { ContactListProps } from "@/types/workspace"

export function ContactList({
  contacts,
  selectedContactId,
  onContactSelect,
  onAddContact,
}: ContactListProps) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between pb-3">
        <h3 className="text-sm font-medium text-foreground">Contacts</h3>
        <button
          onClick={onAddContact}
          className="flex items-center gap-1 text-sm text-violet-600 hover:text-violet-700"
        >
          <Plus className="h-4 w-4" />
          Add
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {contacts.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            isSelected={contact.id === selectedContactId}
            onClick={() => onContactSelect?.(contact.id)}
          />
        ))}
      </div>
    </div>
  )
}
