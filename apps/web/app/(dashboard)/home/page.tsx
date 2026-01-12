import { PageHeader } from "@/components/layout/page-header"
import { WeddingList } from "@/components/wedding/wedding-list"
import { mockWeddings } from "@/data/mock-data"

export default function HomePage() {
  return (
    <>
      <PageHeader
        title="Home"
        subtitle="Manage all your weddings, templates, and vendors in one place."
      />
      <WeddingList weddings={mockWeddings} />
    </>
  )
}
