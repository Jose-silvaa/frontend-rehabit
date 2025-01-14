import { useState } from "react";
import { FaCheck } from 'react-icons/fa';


const CardHabits = () => {

    const [isChecked, setIsChecked] = useState(false);

    const handleClick = () => {
      setIsChecked(!isChecked);
    };

    return (
        <>
        <div className="card h-max overflow-visible bg-Warning duration-200 ease-in-out w-96">
         <div className="card-body space-y-8">
             <div className="flex flex-row items-start space-x-4">
                 <div className="flex-1 min-w-0 whitespace-nowrap cursor-pointer dropdown">
                     <div className="card-title m-0 relative font-extrabold flex flex-row justify-between">
                       <span className="text-ellipsis overflow-hidden">🇪🇸 Learn Spanish</span>
                      </div>
                      <div className="">
                          <span>Edit</span>
                          <span className="ml-5 text-red-500">Remove</span>
                       </div>
                  </div>
               
                </div>
          </div>
        </div>
     </>
    )
}


export default CardHabits;