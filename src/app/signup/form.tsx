"use client"


import { signup } from "../../authentication/actions" 
import { useActionState } from "react"

export default function SignupForm (){

    const [state, action, IsPending] = useActionState(signup, undefined)

    if(state?.success == true){
      window.location.href = state.redirectTo || "/dashboard"
    }

    return (
        <form action={action}>
          <section className="flex flex-col py-1">
            <label className="label" htmlFor="name">
              <span className="text-FontColorAuth">Name</span>
            </label>
            <input className="form-control w-full input input-bordered" name="name" />
           </section>
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
                <button disabled={IsPending} type="submit" className="btn btn-block">{IsPending ? "Submitting..." : "Sign up"}</button>
            </div>
        </form>
    )
}
