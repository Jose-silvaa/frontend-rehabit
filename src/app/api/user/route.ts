
import { NextResponse } from "next/server";
import { verifySession } from "../../../authentication/session"


export async function GET(request : Request){

    //1. Verify user's session
    const session = await verifySession();

    //2. Fetch user data
    try {
        const response = await fetch(`http://127.0.0.1:3333/users/${session.userId}`, {
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

        const filteredUser = userDTO(data)
        
        return NextResponse.json(filteredUser, { status: 200 });


    } catch (error) {
        console.error("Error fetching user data:", error);

        return NextResponse.json({ message: "Erro interno do servidor." }, { status: 500 });
    }

}


function userDTO(user : any){
    return {
        id : user.id,
        name : user.name,
        email : user.email
    }
}