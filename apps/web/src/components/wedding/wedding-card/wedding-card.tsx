"use client"

import { Card, CardContent } from "@/components/ui/card"
import { WeddingCardHeader } from "./wedding-card-header"
import { WeddingCardStatus } from "./wedding-card-status"
import { WeddingCardIntake } from "./wedding-card-intake"
import { WeddingCardAlert } from "./wedding-card-alert"
import { WeddingCardSummary } from "./wedding-card-summary"
import type { WeddingCardProps } from "@/types/wedding"

export function WeddingCard({
  wedding,
  onMenuAction,
  onIntakeAction,
  onAlertAction,
}: WeddingCardProps) {
  return (
    <Card className="flex h-full flex-col">
      <CardContent className="flex flex-1 flex-col pt-6">
        <WeddingCardHeader
          coupleNames={wedding.coupleNames}
          date={wedding.date}
          location={wedding.location}
          venue={wedding.venue}
          onMenuAction={(action) => onMenuAction?.(action, wedding.id)}
        />

        {wedding.statusMessage && (
          <WeddingCardStatus
            status={wedding.status}
            message={wedding.statusMessage}
            detail={wedding.statusDetail}
          />
        )}

        {!wedding.intakeCompleted && (
          <WeddingCardIntake
            onSendIntake={() => onIntakeAction?.("send", wedding.id)}
            onFillIntake={() => onIntakeAction?.("fill", wedding.id)}
          />
        )}

        {wedding.intakeCompleted && (
          <WeddingCardSummary status={wedding.status} />
        )}

        <div className="mt-auto">
          {wedding.alerts.map((alert) => (
            <WeddingCardAlert
              key={alert.id}
              alert={alert}
              onAction={() => onAlertAction?.(alert.id, wedding.id)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
