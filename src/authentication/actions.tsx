"use server"

import { redirect } from "next/navigation";
import { FormState, SignupFormSchema } from "../certificates/zod/signupValidations"
import { createSession } from "./session";


interface SignupResponse {
    success : boolean, 
    message : string,
    errors? : any,
    data?:any,
    redirectTo? : string
}

export async function signup(state : FormState, formData : FormData): Promise<SignupResponse>{
    
    const parsedData = ({
        name : formData.get('name'),
        email : formData.get('email'),
        password : formData.get('password')
    })

    const ValidationResult = SignupFormSchema.safeParse(parsedData);


    if(!ValidationResult.success){
        return {
            success : false,
            message: "Validation failed",
            errors : ValidationResult.error.flatten().fieldErrors,

        }
    }

    try {
        
        const signUpData = {
            name : parsedData.name,
            email : parsedData.email,
            password : parsedData.password,
        }
        
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        const response = await fetch("https://127.0.0.1:3333/users", {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify(signUpData)
        })

        if(!response.ok){
            const errorData = await response.json();

            return {
                success : false,
                message : errorData.message || "An error occurred while creating the account.",
            }
        }

        const data = await response.json();

        await createSession(data.id)//Create a session

        return {
            success: true,
            message: "Account created successfully",
            data : data,
            redirectTo : "/dashboard"
        };

    } catch (error: any) {
        
        console.error("Error during request:", error);

        return {
            success: false,
            message: "An unexpected error occurred while processing the request.",
        };
    }finally{
        redirect("/dashboard")
    }

}