import Link from "next/link";

interface CardPriceProps {
    price : number;
    phrases : [string, string, string];
}


export default function CardPrice({price, phrases} : CardPriceProps){
    
    return (
        <section className="w-full max-w-lg relative h-128 gap-5 lg:gap-8 z-10 p-8 rounded-lg border border-ButtonColor bg-white mb-10 ml-10">
          <div className="flex flex-wrap gap-2 mb-5">
            <p className="text-5xl font-extrabold">${price}</p>
            <div className="flex flex-col justify-end mb-[4px]">
              <p className="text-xs text-base-content/60 uppercase font-semibold">USD</p>
            </div>
          </div>

          <ul className="space-y-2.5 leading-relaxed text-base flex-1">
            {phrases.map((phrase, index) => {
                return (
                    <li key={index} className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-[18px] h-[18px] opacity-80 shrink-0">
                            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                        </svg>
                        <span>{phrase}</span>
                    </li>
                )
            })}
          </ul>
        
        <Link href="/" className="btn bg-ButtonColor btn-block group mt-10">Get ReHabit</Link>

        </section>
    )
}