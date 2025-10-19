"use client"

import InputField from "@/components/InputField";
import CheckboxGroup from "@/components/WeekDays";
import Link from "next/link";
import { useEffect, useState } from "react";

interface User {
    id : string;
    name: string;
    email: string;
    
  }

const habit = () =>{

    const [userData, setUserData] = useState<User | null>();
    const [createHabit, setCreateHabit] = useState({
        userId:  '',
        name : '',
        cue : '',
        routine : '',
        reward : '',
        craving : '', 
        selectedDays: [] as number[],
    })

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
    
            if (data || data.id) {
              setUserData(data); 
              setCreateHabit((prev) => ({
                ...prev,
                userId: data.id, // 🔹 Atualiza o `userId` automaticamente quando os dados do usuário são carregados
              }));
            } else {
              console.error("Dados do usuário inválidos ou ausentes.");
            }
          } catch (error : any) {
            // console.error(error.message || "Erro ao buscar os dados do usuário.");
          }
        };
    
        fetchUserData();
      }, []);

    
    const handleDaysChange = (selectedDays: number[]) => {
        setCreateHabit((prev) => ({
          ...prev,
          selectedDays, // 🔹 Recebemos os números dos dias da semana
        }));
    };
    

    const handleSubmit = async(e: any) =>{
        e.preventDefault();

        try {
            const response = await fetch("https://server-habit.onrender.com/habit", {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(createHabit),
            })

            if (!response.ok) {
                throw new Error("Erro ao criar hábito");
              }
        
              const data = await response.json();

              setCreateHabit({
                name: "",
                cue: "",
                routine: "",
                reward: "",
                craving: "",
                selectedDays: [],
                userId: createHabit.userId, // 🔹 Mantém o userId para não perder a referência do usuário
              });
        
        } catch (error: any) {
            console.error("Erro ao criar hábito:", error.message);

        }
        
    }

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
             <form className="rounded-lg" onSubmit={handleSubmit}>
              <h2 className="text-3xl font-bold tracking-tight mb-5">Create a New Habit</h2>
              <CheckboxGroup onChange={handleDaysChange}/>
              <InputField label="Name" name="name" value={createHabit.name} onChange={handleChange} placeholder="Specify the name of the Habit."/>
              <InputField label="Routine" name="routine" value={createHabit.routine} onChange={handleChange} placeholder="Specify the name of the Routine."/>
              <InputField label="Cue" name="cue" value={createHabit.cue} onChange={handleChange} placeholder="Describe the trigger or stimulus that starts the habit."/>
              <InputField label="Craving" name="craving" value={createHabit.craving} onChange={handleChange} placeholder="Explain the internal desire or motivation behind the routine."/>
              <InputField label="Reward" name="reward" value={createHabit.reward} onChange={handleChange} placeholder="Indicate the benefit obtained from the habit."/>
              <div className="form-group w-[75%]">
                <button type="submit" className="btn btn-block">CREATE <span className="text-Warning uppercase">{createHabit.name}</span> HABIT</button>
              </div>
             </form> 
            </div>
        </section>
    )
}

export default habit;