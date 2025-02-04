"use server"

import { redirect } from "next/navigation";
import { FormState, LoginFormSchema, SignupFormSchema } from "../certificates/zod/signupValidations"
import { createSession } from "./session";
import { da } from "date-fns/locale";


interface SignupResponse {
    success : boolean, 
    message : string,
    errors? : any,
    data?:any,
    redirectTo? : string
}

interface LoginResponse {
    success : boolean
    message : string
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
        const response = await fetch("http://127.0.0.1:3333/users", {
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

        await createSession(data.id)

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


export async function login(state : FormState, formData : FormData) : Promise<LoginResponse>{
    
    const parsedData = ({
        email : formData.get('email'),
        password : formData.get('password')
    })

    const ValidationResult = LoginFormSchema.safeParse(parsedData);

    if(!ValidationResult.success){
        return {
            success : false,
            message: "Validation failed",
            errors : ValidationResult.error.flatten().fieldErrors,

        }
    }

    try {
        const loginData = {
            email : parsedData.email,
            password : parsedData.password,
        }
        
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        const response = await fetch("http://127.0.0.1:3333/login", {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify(loginData)
        })
        

        if(!response.ok){
            const errorData = await response.json();

            return {
                success : false,
                message : errorData.message || "An error occurred while login.",
            }
        }

        
        const data = await response.json();

        await createSession(data.id)

        return {
            success: true,
            message: "Login successfully",
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