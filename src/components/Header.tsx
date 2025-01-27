interface HeaderProps {
    username: string;
    toggleVisibility : () => void;
  }


  
  export function Header({ username, toggleVisibility }: HeaderProps) {

    const firstLetter = username.charAt(0).toUpperCase(); 

    return (
      <header className="bg-landing text-white p-6 flex justify-between items-center">
        <div className="flex items-center">
          <button onClick={toggleVisibility} className="bg-transparent border-none mr-2 text-white text-2xl md:hidden">
            ☰
          </button>
          <h1 className="text-2xl font-bold">Rehabit</h1>
        </div>
        <div className="flex items-center space-x-4">
          <span className="sm:inline">{username}</span>
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-sm font-bold text-gray-700">{firstLetter}</span>
          </div>
        </div>
      </header>
    );
  }
  