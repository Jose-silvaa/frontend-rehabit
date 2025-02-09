"use client"

import { useRouter } from "next/navigation"
import { useActionState, useEffect, useState } from "react"

type FormProps = {
  showName?: boolean
  showEmail?: boolean
  showPassword?: boolean
  buttonText? : string
  onSubmit: (state : any, formData: any) => Promise<any>;
}

export default function FormGeneric({showName = true, showEmail = true, showPassword = true, buttonText = "SIGN UP", onSubmit} : FormProps){

    const [state, action , IsPending] = useActionState(onSubmit, undefined)
    const [loginMessage, setLoginMessage] = useState("");
    const router = useRouter();


    useEffect(() => {
      if (state && state.success && state.redirectTo) {
        router.push(state.redirectTo);
      }

      if(state && state.success == false){
            setLoginMessage(state.message)

            const timer = setTimeout(()=>{
              setLoginMessage("")
            }, 5000)

            return () => clearTimeout(timer);
        }

        
    }, [state]);


    return (
        <form action={action}>
          {showName && (
            <section className="flex flex-col py-1">
            <label className="label" htmlFor="name">
              <span className="text-FontColorAuth">Name</span>
            </label>
            <input className="form-control w-full input input-bordered" name="name" />
           </section>
          )}  
           {state?.errors?.name && <p className="text-red-500">{state.errors.name}</p>}
           <section className="flex flex-col py-1">
              <label className="label" htmlFor="email">
                <span className="text-FontColorAuth">Email</span>
               </label>
               <input className="form-control w-full input input-bordered" name="email" />
            </section>
            {state?.errors?.email && <p className="text-red-500">{state.errors.email}</p>}

            <section className="flex flex-col py-1 mb-5">
              <label className="label" htmlFor="password">
                <span className="text-FontColorAuth">Password</span>
              </label>
              <input className="form-control w-full input input-bordered" name="password" type="password"/>
            </section>
            {state?.errors?.password && (
            <div className="mb-5 mt-2">
               <p className="text-Warning">Password must:</p>
               <ul className="text-red-500">
                  {state.errors.password.map((error: any) => (
                   <li key={error}>- {error}</li>
                ))}
                </ul>
            </div>
            )}
            <div className="form-group">
                <button disabled={IsPending} type="submit" className="btn btn-block flex items-center justify-center gap-2">
                  {IsPending ? (
                    <div className="spinner-border animate-spin border-4 border-t-4 border-white w-6 h-6 rounded-full"></div>
                  ) : (
                    buttonText
                  )}
              </button>
              <p className="text-red-500 mt-5">{`${loginMessage}`}</p>
            </div>
       
        </form>
    )
}
