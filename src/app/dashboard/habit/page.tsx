"use client"

import InputField from "@/components/InputField";
import CheckboxGroup from "@/components/WeekDays";
import Link from "next/link";
import { useState } from "react";


const habit = () =>{

    const [createHabit, setCreateHabit] = useState({
        habit : '',
        cue : '',
        routine : '',
        reward : '',
        craving : '' 
    })



    const handleChange = (e:any) =>{
        const { name,  value } = e.target;
  
        setCreateHabit((prev) => ({
          ...prev,
          [name] : value,
        }))
  
    }

    return (
        <section className="flex flex-col flex-1 space-y-4 p-8 pt-4">
            <div className="navbar sticky top-0 z-50 pt-2 py-0 min-h-[3.5rem] mb-4 lg:mb-2">
             <form className="rounded-lg">
              <h2 className="text-3xl font-bold tracking-tight mb-5">Create a New Habit</h2>
              <CheckboxGroup />
              <InputField label="Habit" name="habit" value={createHabit.habit} onChange={handleChange} placeholder="Specify the name of the Habit."/>
              <InputField label="Routine" name="routine" value={createHabit.routine} onChange={handleChange} placeholder="Specify the name of the Routine."/>
              <InputField label="Cue" name="cue" value={createHabit.cue} onChange={handleChange} placeholder="Describe the trigger or stimulus that starts the habit."/>
              <InputField label="Craving" name="craving" value={createHabit.craving} onChange={handleChange} placeholder="Explain the internal desire or motivation behind the routine."/>
              <InputField label="Reward" name="reward" value={createHabit.reward} onChange={handleChange} placeholder="Indicate the benefit obtained from the habit."/>
              <div className="form-group w-[75%]">
                <button type="submit" className="btn btn-block">CREATE <span className="text-Warning uppercase">{createHabit.habit}</span> HABIT</button>
              </div>
             </form> 
            </div>
        </section>
    )
}

export default habit;