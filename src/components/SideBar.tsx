import { Home, BarChart, Settings, LogOut } from "lucide-react"
import { Button } from "../components/ui/button"
import useWindowSize from "./WindowSize";
import { useRouter } from "next/navigation";
import Link from "next/link";



interface SidebarProps {
  isVisible : boolean;
}


export function Sidebar({isVisible } : SidebarProps) {

  const { width } = useWindowSize();
  const router = useRouter();


  const logoutUser = async () =>{
    try {
      const response = await fetch("/api/logout",{
        method : 'POST'
      })

      if(!response.ok){
        const errorData = await response.json();
        console.error(errorData.message || "Erro deletando a session");
        return;
      }

      const data = await response.json();

      router.push('/login');
  
    } catch (error : any) {
      console.error(error.message || "Erro ao buscar os dados do usuário.");
    }
  }

  return (
    <>
        <aside className={`bg-SideBarMenu text-secondary-foreground w-64 p-4 fixed inset-y-0 left-0 transform transition-transform duration-300 ease-in-out z-30 relative translate-x-0 ${width < 768 && !isVisible ? 'w-full' : width >= 768 ? 'flex flex-col' : 'hidden'}`}>
        <nav className="space-y-2 flex flex-col">
          <Link href="/dashboard">
            <Button variant="ghost" className="w-full justify-start">
              <Home className="mr-2 h-4 w-4" /> Dashboard
            </Button>
          </Link>
          <Link href="/dashboard/settings">
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" /> Settings
            </Button>
          </Link>
        </nav>
        <Button onClick={logoutUser} variant="ghost" className="w-full justify-start">
          <LogOut className="mr-2 h-4 w-4" /> Log out
        </Button>
      </aside> 
    </>
  
  )
}

