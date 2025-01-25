import { Home, BarChart, Settings, LogOut } from "lucide-react"
import { Button } from "../components/ui/button"


interface SidebarProps {
  isVisible : boolean;
}

export function Sidebar({isVisible } : SidebarProps) {
  return (
    <>
        <aside className={`bg-SideBarMenu text-secondary-foreground w-64 p-4 fixed inset-y-0 left-0 transform transition-transform duration-300 ease-in-out z-30 relative translate-x-0 md:hidden ${isVisible ? 'hidden' : 'flex '} `}>
        <nav className="space-y-2 flex flex-col">
          <Button variant="ghost" className="w-full justify-start">
            <Home className="mr-2 h-4 w-4" /> Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <BarChart className="mr-2 h-4 w-4" /> Statistics
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="mr-2 h-4 w-4" /> Settings
          </Button>
        </nav>
        <Button variant="ghost" className="w-full justify-start mt-auto">
          <LogOut className="mr-2 h-4 w-4" /> Log out
        </Button>
      </aside> 
    </>
  
  )
}

