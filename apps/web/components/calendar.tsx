"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Card } from "./ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "./ui/button"

export interface CalendarDay {
  date: Date
  isCurrentMonth: boolean
  isToday?: boolean
}

interface CalendarProps {
  month?: number
  year?: number
  className?: string
  renderDayContent?: (day: CalendarDay) => React.ReactNode
  onDayClick?: (day: CalendarDay) => void
}

const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

export function Calendar({
  month,
  year,
  className,
  renderDayContent,
  onDayClick,
}: CalendarProps) {
  const today = useMemo(() => new Date(), [])
  const [displayMonth, setDisplayMonth] = useState(month ?? today.getMonth())
  const [displayYear, setDisplayYear] = useState(year ?? today.getFullYear())

  const currentMonth = month ?? displayMonth
  const currentYear = year ?? displayYear

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const handlePreviousMonth = () => {
    if (displayMonth === 0) {
      setDisplayMonth(11)
      setDisplayYear(displayYear - 1)
    } else {
      setDisplayMonth(displayMonth - 1)
    }
  }

  const handleNextMonth = () => {
    if (displayMonth === 11) {
      setDisplayMonth(0)
      setDisplayYear(displayYear + 1)
    } else {
      setDisplayMonth(displayMonth + 1)
    }
  }

  const calendarDays = useMemo(() => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1)

    const startDate = new Date(firstDayOfMonth)
    const dayOfWeek = startDate.getDay()
    const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1
    startDate.setDate(startDate.getDate() - daysToSubtract)

    const days: CalendarDay[] = []
    const currentDate = new Date(startDate)

    for (let i = 0; i < 42; i++) {
      const date = new Date(currentDate)
      const isCurrentMonth = date.getMonth() === currentMonth
      const isToday =
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()

      days.push({
        date,
        isCurrentMonth,
        isToday,
      })

      currentDate.setDate(currentDate.getDate() + 1)
    }

    return days
  }, [currentMonth, currentYear, today])

  return (
    <>
      <div className="flex items-center gap-2 mb-2 justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={handlePreviousMonth}
            className="p-1 hover:bg-muted rounded-md transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="text-lg font-medium">
            {monthNames[displayMonth]} {displayYear}
          </span>
          <button
            onClick={handleNextMonth}
            className="p-1 hover:bg-muted rounded-md transition-colors"
            aria-label="Next month"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        <div>
          <Button variant="outline" className="h-6">
            <Image src="/images/google-calendar-icon.png" alt="Calendar" width={12} height={12} />
            Sync with GCal
          </Button>
        </div>
      </div>
      <Card
        className={cn(
          "h-full flex flex-col p-0 gap-0",
          className
        )}
      >
        <div className="grid grid-cols-7 border-b border-border">
          {DAY_NAMES.map((dayName, index) => {
            const isLast = index === 6
            return (
              <div
                key={dayName}
                className={cn(
                  "text-center text-sm font-normal text-muted-foreground py-1.5 h-8 border-border",
                  !isLast && "border-r"
                )}
              >
                {dayName}
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-7 flex-1" style={{ gridAutoRows: "1fr" }}>
          {calendarDays.map((day, index) => {
            const isCurrentMonth = day.isCurrentMonth

            return (
              <div
                key={`${day.date.getTime()}-${index}`}
                className={cn(
                  "border-r border-b border-border p-2 min-h-[100px]",
                  "flex flex-col",
                  index % 7 === 6 && "border-r-0",
                  index >= 35 && "border-b-0",
                  !isCurrentMonth && "text-muted-foreground/50"
                )}
                onClick={() => onDayClick?.(day)}
              >
                <div className="flex items-start justify-center mb-1">
                  <span
                    className={cn(
                      "text-sm font-normal text-foreground",
                      day.isToday && "bg-[#7F4EA3] text-white rounded-full w-6 h-6 flex items-center justify-center"
                    )}
                  >
                    {day.date.getDate()}
                  </span>
                </div>

                {renderDayContent && (
                  <div className="flex-1 flex flex-col gap-1 mt-1">
                    {renderDayContent(day)}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </Card>
    </>

  )
}

export default Calendar;
