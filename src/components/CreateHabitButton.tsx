"use client"

import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export function CreateHabitButton() {
  return (
    <Button onClick={() => alert("Create habit functionality to be implemented")}>
      <PlusCircle className="mr-2 h-4 w-4 text-white" />
      <p className="text-white">Create Habit</p>
    </Button>
  )
}
