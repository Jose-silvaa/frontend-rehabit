import Link from "next/link";

const HeroSection = () => {

    return (
        <section className="bg-landing h-screen pt-10 pl-20">
            
            <h1 className="text-FontColor text-6xl font-semibold">Rehabit</h1>
            <nav className="flex flex-col">
                <Link href="">
                    <button className="bg-ButtonColor text-white px-4 py-2 rounded-xl w-64">I Have AN ACCOUNT</button>
                </Link>
                <Link href="/signup">
                    <button className="bg-ButtonColor text-white px-4 py-2 rounded-xl w-64 mt-4">SIGN UP</button>
                </Link>
            </nav>
        </section>
    )

}


export default HeroSection;