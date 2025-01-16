

interface MainPhrases {
    title : string,
    subtitle : string
}

const Phrases = ({title, subtitle}: MainPhrases) =>{

    return (
        <>
         <h1 className="text-5xl font-bold tracking-tight text-landing sm:text-6xl">{title}</h1>
         <p className="mt-6 text-lg leading-8 text-600 max-w-2xl mx-auto">{subtitle}</p>
        </>
    )
}


export default Phrases;