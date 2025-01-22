import { cache } from "react"
import { verifySession } from "../authentication/session"


export const getUser = cache(async () => {

    //Verify user's session
    const session = await verifySession();

    //Fetch user data
    try {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        const response = await fetch(`https://127.0.0.1:3333/session/${session.userId}`, {
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json',
            },
        })

        if(!response.ok){
            const errorData = await response.json();
            
            return {
                success : false,
                message : errorData.message || "An error occurred while creating the account."
            }
        }

        const data = await response.json();
        
        return {
            success: true,
            message: "Account created successfully",
            data : data
        };


    } catch (error) {
        
    }

})
