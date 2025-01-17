"use client"

import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";



const Signup = () =>{

    const [signUpData, setSignUpData] = useState({
      name : "",
      email : "",
      password : ""
    })



    const handleChange = (e:any) =>{
      const { name,  value } = e.target;

      setSignUpData((prev) => ({
        ...prev,
        [name] : value,
      }))

    }

    

    const handleSubmit = async(e:any) =>{
      e.preventDefault();

        try {
          const response = await fetch("http://localhost:3333/users", {
            method : 'POST',
            headers : {
              'Content-Type' : 'application/json'
            },
            body : JSON.stringify(signUpData)
          })

          const data = await response.json();

          if(response.status == 201){
              console.log("Your Account")
              setSignUpData({
                name: "",
                email: "",
                password: "",
              });

          
          }else if(response.status == 400){
              console.log("Email already registered.")
          }
        } catch (error) {
          
        }

    }
  
    return (
        
        <div>
          
          <section className="pt-8 pb-2">
           <h1 className="text-center text-4xl text-Warning">Design Habits You’ll Keep Forever</h1>
          </section>
          <div className="max-w-xl mx-auto p-8 rounded-2xl">
              <button className="btn btn-block bg-white text-black hover:bg-gray-100 hover:text-black !border-base-content/20 ">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-4" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                  <path d="M1 1h22v22H1z" fill="none"></path>
                </svg>SIGN UP WITH GOOGLE
              </button>
              <div className="py-4 divider">
                <span className="text-FontColorAuth">OR</span>
              </div>
            <form onSubmit={handleSubmit}>
              <section className="flex flex-col py-1">
                <label className="label" htmlFor="name">
                  <span className="text-FontColorAuth">Name</span>
                </label>
                <input  className="form-control w-full input input-bordered" type="text" id="name" name="name" required value={signUpData.name} onChange={handleChange}></input>
              </section>
              <section className="flex flex-col py-1">
                <label className="label" htmlFor="email">
                   <span className="text-FontColorAuth">Email</span>
                </label>
                <input className="form-control w-full input input-bordered" type="email" id="email" name="email" required value={signUpData.email} onChange={handleChange}/>
              </section>

              <section className="flex flex-col py-1 mb-8">
                  <label className="label" htmlFor="password">
                     <span className="text-FontColorAuth">Password</span>
                  </label>
                  <input className="form-control w-full input input-bordered" type="password" id="password" name="password" required value={signUpData.password} onChange={handleChange}/>
              </section>
              <div className="form-group">
                <button type="submit" className="btn btn-block">SIGN UP</button>
              </div>
            </form> 
          </div>
          <div className="text-FontColorAuth font-medium text-center">
            Already have an account?
            <Link href="/login" className="text-Warning sublime ml-1">Log in</Link>
          </div>
        </div>
      
    )

}


export default Signup;