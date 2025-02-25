import Link from "next/link";
import Phrases from "./Phrases";

const HeroSection = () => {

    return (
      <section className="h-screen flex flex-col items-center justify-center px-4 ">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          <Phrases title="Create and Sustain Positive Habits" subtitle="Rehabit helps you track and build personalized habits for lasting transformation."></Phrases>
          <nav className="flex flex-col md:flex-row gap-4 mt-6 justify-center">
            <Link href="/login">
                <button className="bg-landing text-white px-4 py-2 rounded w-full md:w-64">
                    I HAVE AN ACCOUNT
                </button>
            </Link>
            <Link href="/signup">
                <button className="bg-White text-landing px-4 py-2 rounded w-full md:w-64 border border-landing">
                    SIGN UP
                </button>
            </Link>
          </nav>
        </div>
     </section>
    
    )

}


export default HeroSection;