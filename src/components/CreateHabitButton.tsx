"use client"

import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export function CreateHabitButton() {

  const router = useRouter();
  return (
    <Button onClick={() => router.push("/dashboard/habit")}>
      <PlusCircle className="mr-2 h-4 w-4 text-white" />
      <p className="text-white">Create Habit</p>
    </Button>
  )
}
