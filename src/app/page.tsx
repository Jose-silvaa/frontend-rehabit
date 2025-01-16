import Phrases from "@/components/Phrases";
import HeroSection from "../components/HeroSection";
import CardPrice from "@/components/CardPrice";

export default function Home() {
  return (
      <>
        <HeroSection />

        <div className="bg-MainPage h-auto px-4 pt-20 pb-16 flex flex-col md:flex-col justify-center">
          <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
            <Phrases title="Stop Wasting Time Struggling to Build Better Habits" subtitle="Create, track, and transform your habits with a simple and customizable system."/>
          </section>
          <div className=" flex flex-col md:flex-row items-center justify-center">
            <CardPrice price={5} phrases={["Daily reminders", "Create 3 Habits", "Export 3 Habit Images"]} /> 
            <CardPrice price={47} phrases={["Daily reminders", "Unlimited Habit Creation", "Unlimited Habit Image Exports"]} />
          </div>
        </div>
      
      </>
  );
}
