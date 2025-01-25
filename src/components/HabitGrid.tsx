"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"

// Mock data for habits with days of the week
const habits = [
  { id: 1, name: "Morning Meditation", streak: 5, frequency: "Daily", days: [0, 1, 2, 3, 4, 5, 6] },
  { id: 2, name: "Read 30 minutes", streak: 3, frequency: "Weekdays", days: [1, 2, 3, 4, 5] },
  { id: 3, name: "Exercise", streak: 2, frequency: "3 times a week", days: [1, 3, 5] },
  { id: 4, name: "Learn a new word", streak: 7, frequency: "Daily", days: [0, 1, 2, 3, 4, 5, 6] },
  { id: 5, name: "Drink 8 glasses of water", streak: 4, frequency: "Weekdays", days: [1, 2, 3, 4, 5] },
]

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export function HabitGrid() {
  const [completedHabits, setCompletedHabits] = React.useState<number[]>([])

  const today = new Date()

  const toggleHabitCompletion = (id: number) => {
    setCompletedHabits((prev) => (prev.includes(id) ? prev.filter((habitId) => habitId !== id) : [...prev, id]))
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {habits
          .filter((habit) => habit.days.includes(today.getDay()))
          .map((habit) => (
            <div
              key={habit.id}
              className={`bg-card text-card-foreground rounded-lg shadow-sm p-4 flex flex-col
                        border border-gray-200 hover:border-primary transition-colors duration-200
                        ${completedHabits.includes(habit.id) ? "bg-primary/10" : ""}`}
            >
              <div className="flex justify-between items-center mb-2 relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0 opacity-60 absolute z-10 top-1/2 -translate-y-1/2 -left-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                </svg>
                <h3 className="font-semibold text-lg ml-3">{habit.name}</h3>
                <span className="text-sm text-muted-foreground px-2 py-1 bg-secondary rounded-full">
                  {habit.frequency}
                </span>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm font-medium">Streak: {habit.streak} days</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`w-6 h-6 p-0 rounded-sm relative
                            ${
                              completedHabits.includes(habit.id)
                                ? "bg-primary text-primary-foreground"
                                : "border-2 border-muted-foreground"
                            }`}
                  onClick={() => toggleHabitCompletion(habit.id)}
                >
                  {completedHabits.includes(habit.id) && (
                    <svg className="absolute inset-x-0 mx-auto text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </Button>
              </div>
              <div className="flex justify-between mt-4 text-xs text-muted-foreground">
                {daysOfWeek.map((day, index) => (
                  <span
                    key={day}
                    className={`w-6 h-6 flex items-center justify-center rounded-full
                              ${habit.days.includes(index) ? "bg-landing text-white" : "bg-muted"}`}
                  >
                    {day[0]}
                  </span>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

