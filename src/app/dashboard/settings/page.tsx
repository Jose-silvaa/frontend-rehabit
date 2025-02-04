"use client"

import { useState, useEffect } from "react";
import TabsContent from "../../../components/TabsContent";

    
interface User {
    id : string;
    name: string;
    email: string;
    
  }


export default function ConfigPage(){

    const [userData, setUserData] = useState<User | null>(null);

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
    

    return (
        <div className="flex-1 space-y-4 p-8 pt-8">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Settings</h2>    
            </div>
            <TabsContent user={userData}/>
        </div>
    )


}

