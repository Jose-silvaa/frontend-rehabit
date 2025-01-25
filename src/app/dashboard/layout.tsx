"use client"

import { Header } from "@/components/Header"
import { Sidebar } from "@/components/SideBar"
import { useState } from "react"


interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {

  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () =>{
    setIsVisible((prev) => !prev)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header username={"I don't know yet"} toggleVisibility={toggleVisibility}/>
      <div className="flex flex-1">
        <Sidebar isVisible={isVisible}/>  
        <main className="flex w-full flex-1 flex-col overflow-hidden">{children}</main>
      </div>
    </div>
  )
}

