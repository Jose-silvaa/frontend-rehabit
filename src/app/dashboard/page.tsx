"use client"

import { CreateHabitButton } from "../../components/CreateHabitButton";
import { HabitGrid } from "../../components/HabitGrid";
import { format } from "date-fns"


const Dashboard = () =>{
  
  const today = new Date()

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Your Habits</h2>
             <div className="text-lg font-medium">
                    {format(today, "EEEE, d MMMM")}
                    </div>
            <div className="flex items-center space-x-2">
                <CreateHabitButton />
            </div>
          </div>
            <HabitGrid />
        </div>
    )
}

export default Dashboard;