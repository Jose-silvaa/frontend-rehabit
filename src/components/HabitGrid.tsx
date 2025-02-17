"use client"

import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import habit from "@/app/dashboard/habit/page";


interface Habit {
  id : string;
  name : string;
  userId : string;
  cueId : string;
  routineId : string;
  rewardId : string;
  cravingId : string;
  streak : number;
  selectedDays : number[];
}

interface User {
  id : string;
  name: string;
  email: string;
  
}

type HabitInfo = {
  cueName: { id: string; description: string };
  rotuineName: { id: string; description: string };
  cravingName: { id: string; description: string };
  rewardName: { id: string; description: string };
};

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export function HabitGrid() {
  const [completedHabits, setCompletedHabits] = React.useState<number[]>([])
  const [habits, setHabits] = useState<Habit[]>([]);
  const [userData, setUserData] = useState<User | null>();
  const [arrow, setArrow] = useState<{ [key: string]: boolean }>({});
  const [nameInformation, setNamesInformation] = useState<{[key : string ]: HabitInfo}>({});

  const toggleHabitCompletion = (id: number) => {
    setCompletedHabits((prev) => (prev.includes(id) ? prev.filter((habitId) => habitId !== id) : [...prev, id]))
  }

  const handleClick = (habitId: string) =>{

    setArrow((prev) => ({ ...prev, [habitId]: !prev[habitId] }))
    if(!arrow[habitId]) fetchDetailsRoutine(habitId);
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/user", {
          method : 'GET',
          headers : {
            'Content-Type' : 'application/json',
        },
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error(errorData.message || "Erro ao buscar dados do usuário.");
          return; 
        }

        const data = await response.json();

        if (data || data.email) {
          setUserData(data); 
        } else {
          console.error("Dados do usuário inválidos ou ausentes.");
        }
      } catch (error : any) {
        // console.error(error.message || "Erro ao buscar os dados do usuário.");
      }
    };

    fetchUserData();
  }, []);

  useEffect(()=>{

    const fetchHabitsUser = async ()=>{

      try {
        const response = await fetch("http://127.0.0.1:3333/habit/all", {
          method : 'GET',
          headers : {
            'Content-Type' : 'application/json'
          }
        });

        if(!response.ok){
          const error = await response.json();
          console.error(error.message || "Erro ao buscar dados")
        }

        const habits = await response.json();

        setHabits(habits)
      } catch (error) {
        
      }
    }

    fetchHabitsUser();
  }, [])


  let filteredHabits = habits.filter(habit => habit.userId === userData?.id)

  

  const fetchDetailsRoutine = async (habitId: string)=>{

      try {

        const habit =  habits.find(habit => habit.id === habitId);
        if(!habit) return;

        const requestBody = {
          cravingId : habit.cravingId,
          cueId : habit.cueId,
          rewardId : habit.rewardId,
          routineId : habit.routineId
        }

        const response = await fetch("http://127.0.0.1:3333/users/details", {
          method : "POST",
          headers : {
            "Content-Type" : "application/json",
          },
          body : JSON.stringify(requestBody)
        })

        if(!response.ok){
          console.error("Erro ao buscar dados")
        }

        const result = await response.json();

   
        setNamesInformation((prev) => ({
          ...prev,
          [habitId]: result,
        }));


      } catch (error) {
        console.error("Erro na segunda requisição", error);
      }
  }


  return (
    <div>
        <section className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 gap-5">
            {filteredHabits.map(habit => {
              return ( 
                <section key={habit.id}>
                  <div className="bg-card text-card-foreground rounded-lg shadow-sm p-4 flex flex-col border border-gray-200 hover:border-primary transition-colors duration-200">
                      <div className="flex justify-between items-center mb-2 relative">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0 opacity-60 absolute z-10 top-1/2 -translate-y-1/2 -left-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                        </svg>
                        <h3 className="font-semibold text-lg ml-3">{habit.name}</h3>
                        <span className="text-sm text-muted-foreground px-2 py-1 bg-secondary rounded-full">
                          {arrow[habit.id] ? (
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`cursor-pointer`} onClick={()=> handleClick(habit.id)}>
                              <path d="M18 15L12 9L6 15" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                             ) : (
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="cursor-pointer" onClick={() => handleClick(habit.id)}>
                              <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-sm font-medium">Streak: {habit.streak} days</span>
                        <Button variant="ghost" size="sm"
                            className="w-6 h-6 p-0 rounded-sm relative bg-primary text-primary-foreground border-2 border-muted-foreground">
                              <svg className="absolute inset-x-0 mx-auto text-white" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            
                          </Button>
                      </div>
                      <div className="flex justify-between mt-4 text-xs text-muted-foreground">
                        {daysOfWeek.map((day, index) => (
                          <span key={day} className={`w-6 h-6 flex items-center justify-center rounded-full ${habit.selectedDays.includes(index) ? "bg-landing text-white" : "bg-muted"}`}>
                            {day[0]}
                          </span>
                        ))}
                      </div>
                  </div>
                    {arrow[habit.id] && (
                      <div className="p-4 border border-gray-200 rounded-lg slide-in">
                        <ul className="mt-2 ">
                          {nameInformation[habit.id] && (
                            <>
                              <li className="pb-2">🛑 Cue     : {nameInformation[habit.id].cueName.description}</li>
                              <li className="pb-2">🔥 Craving  : {nameInformation[habit.id].cravingName.description}</li>
                              <li className="pb-2">🏃 Routine : {nameInformation[habit.id].rotuineName.description}</li>
                              <li className="pb-2">🎉 Reward  : {nameInformation[habit.id].rewardName.description}</li>  
                            </>
                          )}             
                        </ul>
                      </div>
                    )}
                </section>
              )
            })}
        </section>
    </div>
  )
}

