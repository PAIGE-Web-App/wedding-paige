"use client"

import { useState, useEffect } from "react"
import { X, Trash2, Calendar as CalendarIcon, User, Building2, ChevronDown, Info, Link as LinkIcon, Check } from "lucide-react"
import { format } from "date-fns"
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { Todo } from "@/types/todos"

interface TodoEditDrawerProps {
  todo: Todo | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave?: (todo: Todo) => void
  onDelete?: (todo: Todo) => void
}

function formatDate(date: Date | undefined): string {
  if (!date) return ""
  return format(date, "MMM. d, yyyy")
}

function formatDateShort(date: Date | undefined): string {
  if (!date) return ""
  return format(date, "MMM. d yyyy")
}

function formatBudgetDate(date: Date): string {
  return format(date, "MMM. d yyyy")
}

interface BudgetItem {
  id: string
  title: string
  spent: number
  committed: number
  dueDate: Date
  vendor: string
  linked: boolean
  todoCount: number
  category: string
}

const mockBudgetItems: BudgetItem[] = [
  {
    id: "budget-001",
    title: "Venue Rental",
    spent: 7400,
    committed: 24400,
    dueDate: new Date("2026-03-01"),
    vendor: "The Barn at Willow Creek",
    linked: true,
    todoCount: 1,
    category: "Venue",
  },
  {
    id: "budget-002",
    title: "Bar Package",
    spent: 1400,
    committed: 700,
    dueDate: new Date("2026-03-01"),
    vendor: "The Barn at Willow Creek",
    linked: false,
    todoCount: 1,
    category: "Venue",
  },
]

function BudgetItemCard({ item }: { item: BudgetItem }) {
  const [checked, setChecked] = useState(item.linked)

  return (
    <Card className={`p-4 border border-2 ${checked ? 'border-accent' : ''} bg-transparent`} onClick={() => setChecked(!checked)}>
      <div className="flex items-start gap-3">
        <Checkbox
          checked={checked}
          className="mt-0.5 shrink-0"
        />
        <div className="flex-1 space-y-2 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p className="font-medium text-sm">{item.title}</p>
            {checked && (
              <Badge className="bg-[#8B4513] text-white border-0 text-xs px-2 py-0.5 shrink-0">
                <Check />
                Linked
              </Badge>
            )}
          </div>
          <div className="text-xs text-muted-foreground">
            <span>${item.spent.toLocaleString()} spent</span>
            <span className="mx-1">•</span>
            <span>${item.committed.toLocaleString()} committed</span>
          </div>
          <div className="text-xs text-muted-foreground">
            Due: {formatBudgetDate(item.dueDate)}
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Building2 className="h-4 w-4 shrink-0" />
            <span>{item.vendor}</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline" className="text-xs">
              <LinkIcon className="h-3 w-3 mr-1" />
              {item.todoCount} to-dos
            </Badge>
            <Badge variant="outline" className="text-xs">
              {item.category}
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  )
}

export function TodoEditDrawer({
  todo,
  open,
  onOpenChange,
  onSave,
  onDelete,
}: TodoEditDrawerProps) {
  const [todoName, setTodoName] = useState("")
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined)
  const [dueNotRelevant, setDueNotRelevant] = useState(false)
  const [notes, setNotes] = useState("")
  const [assignedTo, setAssignedTo] = useState("You")
  const [category, setCategory] = useState("")
  const [calendarOpen, setCalendarOpen] = useState(false)

  useEffect(() => {
    if (todo && open) {
      setTodoName(todo.title || "")
      setDueDate(todo.dueDate)
      setAssignedTo(todo.assignedTo?.name || "You")
      setCategory(todo.category || "")
      setNotes("")
      setDueNotRelevant(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todo?.id, open])

  const handleSave = () => {
    if (!todo) return
    const updatedTodo: Todo = {
      ...todo,
      title: todoName,
      dueDate: dueNotRelevant ? undefined : dueDate,
      category,
      assignedTo: assignedTo ? { id: "1", name: assignedTo } : undefined,
    }
    onSave?.(updatedTodo)
    onOpenChange(false)
  }

  const handleDelete = () => {
    if (!todo) return
    onDelete?.(todo)
    onOpenChange(false)
  }

  return (
    <Drawer open={open && !!todo} onOpenChange={onOpenChange} direction="right">
      <DrawerContent key={todo?.id} className="h-full flex flex-col" style={{ maxWidth: '540px' }}>
        {todo && (
          <>
            <DrawerHeader className="shrink-0 border-b bg-accent/10">
              <div className="flex items-center justify-end">
                <DrawerClose asChild>
                  <Button variant="ghost" size="icon-sm" className="h-8 w-8">
                    <X className="h-4 w-4" />
                  </Button>
                </DrawerClose>
              </div>
            </DrawerHeader>

            <div className="p-4 space-y-2 shrink-0 ">
              <div className="flex items-start justify-between gap-4">
                <DrawerTitle className="font-medium flex-1 font-sans">{todo.title}</DrawerTitle>
                <Button
                  variant="outline"
                  size="xs"
                  onClick={handleDelete}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
              {todo.dueDate && (
                <p className="text-sm text-muted-foreground">
                  Due: {formatDateShort(todo.dueDate)}
                </p>
              )}
              {todo.location && (
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{todo.location}</span>
                </div>
              )}
              <Badge variant="outline" className="text-xs">
                Venue
              </Badge>
            </div>

            <Tabs defaultValue="details" className="w-full flex flex-col flex-1">
              <div className="px-4 pt-4">
                <TabsList>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="linked">Linked budget items</TabsTrigger>
                </TabsList>
              </div>

              <div className="flex-1 overflow-hidden px-4 py-6 flex flex-col">
                <TabsContent value="details" className="space-y-6 mt-0 overflow-y-auto">
                  <div className="space-y-2">
                    <Label htmlFor="todo-name">To-do Name</Label>
                    <Input
                      id="todo-name"
                      value={todoName}
                      onChange={(e) => setTodoName(e.target.value)}
                      placeholder="Enter to-do name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Due</Label>
                    <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                          disabled={dueNotRelevant}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dueDate ? formatDate(dueDate) : "Select date"}
                          <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-4" align="start">
                        <Calendar
                          mode="single"
                          selected={dueDate}
                          onSelect={(date) => {
                            setDueDate(date)
                            setCalendarOpen(false)
                          }}
                          className="w-full bg-transparent"
                        />
                      </PopoverContent>
                    </Popover>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="due-not-relevant"
                        checked={dueNotRelevant}
                        onCheckedChange={(checked) => setDueNotRelevant(checked === true)}
                      />
                      <Label
                        htmlFor="due-not-relevant"
                        className="text-sm font-normal cursor-pointer"
                      >
                        Due isn&apos;t relevant
                      </Label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Click to add notes"
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Assigned to:</Label>
                    <Select value={assignedTo} onValueChange={setAssignedTo}>
                      <SelectTrigger className="w-full">
                        <User className="mr-2 h-4 w-4" />
                        <SelectValue />
                        <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="You">You</SelectItem>
                        <SelectItem value="Partner">Partner</SelectItem>
                        <SelectItem value="Planner">Planner</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger className="w-full">
                        {category ? (
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{category}</Badge>
                          </div>
                        ) : (
                          <SelectValue placeholder="Select category" />
                        )}
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Photography">Photography</SelectItem>
                        <SelectItem value="Venue">Venue</SelectItem>
                        <SelectItem value="Catering">Catering</SelectItem>
                        <SelectItem value="Music">Music</SelectItem>
                        <SelectItem value="Flowers">Flowers</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>
                <TabsContent value="linked" className="mt-0 flex flex-col flex-1 overflow-hidden">
                  <div className="space-y-3 shrink-0">
                    <p className="text-sm text-muted-foreground">
                      Stay in sync automatically. When vendors email changes, both your budget and tasks update together.
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Why link budget items to to-dos?</span>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>

                  <ScrollArea className="flex-1 mt-4 border rounded-md">
                    <div className="space-y-3 p-4">
                      {mockBudgetItems.map((item) => (
                        <BudgetItemCard key={item.id} item={item} />
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </div>
            </Tabs>

            <DrawerFooter className="border-t shrink-0">
              <Button onClick={handleSave} className="w-full">
                Save & Close
              </Button>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  )
}
