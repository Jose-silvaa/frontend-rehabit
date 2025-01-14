"use client"

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
        <section className="bg-landing h-100%">
            <div className="max-w-xl mx-auto">
            <div className="navbar bg-base-200 sticky top-0 z-50 pt-2 py-0 min-h-[3.5rem] mb-4 lg:mb-2 uppercase border-b border-base-content/10 lg:border-0 ">
              <div className="navbar-start">
                <Link href="/dashboard">
                <button className="btn btn-ghost whitespace-nowrap ">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-left" className="svg-inline--fa fa-arrow-left mr-2 w-4 h-4 inline" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                      <path fill="currentColor" d="M447.1 256C447.1 273.7 433.7 288 416 288H109.3l105.4 105.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H416C433.7 224 447.1 238.3 447.1 256z">
                      </path>
                    </svg>
                    <span>Back</span>
                  </button>
                </Link>
              </div>
            </div>
             <form className="border border-Warning px-10 py-2 pb-10 rounded-lg">
              <section className="flex flex-col py-1">
                <label className="label" htmlFor="habit">
                  <span className="text-FontColorAuth">New Habit</span>
                </label>
                <input  className="form-control w-full input input-bordered" type="text" id="habit" name="habit" required value={createHabit.habit} onChange={handleChange} placeholder="Specify the name of the Habit."/>
              </section>
              <section className="flex flex-col py-1">
                <label className="label" htmlFor="routine">
                   <span className="text-FontColorAuth">Routine</span>
                </label>
                <input className="form-control w-full input input-bordered" type="text" id="routine" name="routine" required value={createHabit.routine} onChange={handleChange} placeholder="Specify the name of the Routine."/>
              </section>
              <section className="flex flex-col py-1">
                <label className="label" htmlFor="email">
                   <span className="text-FontColorAuth">Cue</span>
                </label>
                <input className="form-control w-full input input-bordered" type="text" id="cue" name="cue" required value={createHabit.cue} onChange={handleChange} placeholder="Describe the trigger or stimulus that starts the habit."/>
              </section>
              <section className="flex flex-col py-1">
                <label className="label" htmlFor="email">
                   <span className="text-FontColorAuth">Craving</span>
                </label>
                <input className="form-control w-full input input-bordered" type="text" id="craving" name="craving" required value={createHabit.craving} onChange={handleChange} placeholder="Explain the internal desire or motivation behind the routine."/>
              </section>

              <section className="flex flex-col py-1 mb-8">
                  <label className="label" htmlFor="reward">
                     <span className="text-FontColorAuth">Reward</span>
                  </label>
                  <input className="form-control w-full input input-bordered" type="text" id="reward" name="reward" required value={createHabit.reward} onChange={handleChange} placeholder="Indicate the benefit obtained from the habit."/>
              </section>

              <CheckboxGroup />
              <div className="form-group">
                <button type="submit" className="btn btn-block">CREATE <span className="text-Warning uppercase">{createHabit.habit}</span> HABIT</button>
              </div>
             </form> 
            </div>
        </section>
    )
}

export default habit;