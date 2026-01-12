import { WorkspaceLayout } from "@/components/layout/workspace-layout"
import { NextStepBanner } from "@/components/workspace/next-step-banner"
import { InboxContainer } from "@/components/workspace/inbox/inbox-container"
import { mockWeddings, mockContacts, mockThreads } from "@/data/mock-data"
import { notFound } from "next/navigation"

interface WeddingWorkspacePageProps {
  params: Promise<{ id: string }>
}

export default async function WeddingWorkspacePage({ params }: WeddingWorkspacePageProps) {
  const { id } = await params
  const wedding = mockWeddings.find((w) => w.id === id)

  if (!wedding) {
    notFound()
  }

  return (
    <WorkspaceLayout weddingId={id} coupleNames={wedding.coupleNames}>
      {!wedding.intakeCompleted && (
        <NextStepBanner
          title="Send Couple Intake"
          description={`This helps Paige personalize to-dos, budget, and timeline suggestions for ${wedding.coupleNames}.`}
          tip="The earlier the intake is done, the better Paige can plan."
          secondaryAction={{ label: "Fill it in yourself" }}
          primaryAction={{ label: "Send intake to couple" }}
        />
      )}

      <div className="mt-6">
        <InboxContainer
          contacts={mockContacts}
          threads={mockThreads}
          selectedContactId={mockContacts[0]?.id}
        />
      </div>
    </WorkspaceLayout>
  )
}
