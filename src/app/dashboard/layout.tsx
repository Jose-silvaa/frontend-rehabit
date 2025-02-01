"use client"

import { Header } from "@/components/Header"
import { Sidebar } from "@/components/SideBar"
import { useState, useEffect } from "react"


interface User {
  name: string;
  email: string;
}

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {

  const [isVisible, setIsVisible] = useState(false)
  const [userData, setUserData] = useState<User | null>();

  const toggleVisibility = () =>{
    setIsVisible((prev) => !prev)
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



  return (
      <div className="flex min-h-screen flex-col">
        <Header username={userData?.email || 'Loading...'} toggleVisibility={toggleVisibility}/>
      <div className="flex flex-1">
        <Sidebar isVisible={isVisible}/>  
        <main className="flex w-full flex-1 flex-col overflow-hidden">{children}</main>
      </div>
    </div>
  )
}

