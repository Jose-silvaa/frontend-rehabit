import { useEffect, useState } from "react";

const CurrentTime = () =>{

    const [time, setTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
          setTime(new Date().toLocaleTimeString());
        };
    
        updateTime(); 
        const interval = setInterval(updateTime, 1000); 
    
        return () => clearInterval(interval); 
      }, []);

      return <p>{time}</p>
}


export default CurrentTime;