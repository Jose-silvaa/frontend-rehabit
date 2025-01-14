"use client"

import Link from "next/link";
import CardHabits from "../../components/CardHabits";
import CurrentTime from "../../utils/CurrentTime";
import DaysOfYear from "../../utils/GenerateDays";




const Dashboard = () =>{

    return (
        <div className="bg-landing h-screen">
            <section className="text-right text-ButtonColor">
                {/* <CurrentTime /> */}
            </section>

            <main className="flex flex-col w-1/2 mx-auto">
                {/* <DaysOfYear /> */}
                <Link href="/dashboard/habit" className="mb-5 bg-ButtonColor p-3 text-FontColorAuth w-64 rounded-lg">
                    <button>CREATE A NEW HABIT</button>
                </Link>
                <CardHabits />
            </main>
        </div>
    )
}

export default Dashboard;