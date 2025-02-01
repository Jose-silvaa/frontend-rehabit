import Link from "next/link"
import FormGeneric from "../signup/form"
import { signup } from "@/authentication/actions"


export default function Signup (){

    return (
        <div className="bg-landing min-h-screen">
          <section className="pt-8 pb-2">
           <h1 className="text-center text-4xl text-Warning mt-16">Design Habits You’ll Keep Forever</h1>
          </section>
          <div className="max-w-xl mx-auto p-8 rounded-2xl">
            <FormGeneric onSubmit={signup}/>
          </div>
          <div className="text-FontColorAuth font-medium text-center pb-3">
            Already have an account?
            <Link href="/login" className="text-Warning sublime ml-1">Log in</Link>
          </div>
        </div>
    )
}


