
import { NextResponse } from "next/server";
import { verifySession } from "../../../authentication/session"


export async function GET(request : Request){

    //1. Verify user's session
    const session = await verifySession();

    //2. Fetch user data
    try {
        const response = await fetch(`https://server-habit.onrender.com/users/${session.userId}`, {
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json',
            },
        })

        if(!response.ok){
            const errorData = await response.json();
            
            return NextResponse.json({
                success: false,
                message: errorData.message || "An error occurred while fetching user data."
            }, { status: response.status });
        }

        const data = await response.json();

        const filteredUser = userDTO(data)
        
        return NextResponse.json(filteredUser, { status: 200 });


    } catch (error) {
        console.error("Error fetching user data:", error);

        return NextResponse.json({ message: "Erro interno do servidor." }, { status: 500 });
    }

}


function userDTO(user : any){
    return NextResponse.json({ 
        id : user.id,
        name : user.name,
        email : user.email
    })
}