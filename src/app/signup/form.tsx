"use client"

import { useActionState } from "react"

type FormProps = {
  showName?: boolean
  showEmail?: boolean
  showPassword?: boolean
  buttonText? : string
  onSubmit: (state : any, formData: any) => Promise<any>;
}

export default function FormGeneric({showName = true, showEmail = true, showPassword = true, buttonText = "SIGN UP", onSubmit} : FormProps){

    const [state, action , IsPending] = useActionState(onSubmit, undefined)

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
                <button disabled={IsPending} type="submit" className="btn btn-block">{IsPending ? "Submitting..." : buttonText}</button>
            </div>
        </form>
    )
}
