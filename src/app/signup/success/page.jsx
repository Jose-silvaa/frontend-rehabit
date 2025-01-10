import Link from "next/link";

Link

const successMessage = () =>{

    return (
        <div className="bg-landing flex flex-col items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-5xl text-Warning">Success !!</h2>
            <div className="flex flex-col mt-2">
              <span className="text-white">Your Account has been registered..</span>
              <span className="text-white">You will be redirected back to log in in 5 sec.</span>
              <Link href="/signup">
                <button className="btn btn-block mt-4 text-base">
                    Continue
                </button>
              </Link>
            </div>
           </div>
        </div>
    )
}


export default successMessage;