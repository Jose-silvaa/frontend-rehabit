import { useEffect, useState } from "react";


interface User {
    id: string;
    name: string;
    email: string;

}

interface TabsContentProps {
    user: User | null;
}


export default function TabsContent({ user }: TabsContentProps) {

    const [feedback, setFeedback] = useState("");
    const [message, setMessage] = useState<String>("");
    const [isLoading, setIsLoading] = useState<boolean>(false); // Para controle de carregamento


    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage(""); // Esconde a mensagem após 5 segundos
            }, 5000); // 5 segundos

            return () => clearTimeout(timer); // Limpa o timer caso o componente seja desmontado
        }
    }, [message]);



    const handleChange = (event: any) => {
        setFeedback(event.target.value)
    }

    async function handleFeedback(user_id: string, feedback: string) {

        if (!user_id || !feedback) {
            // Se qualquer valor for falso, mostre uma mensagem ou faça algo
            setMessage('User ID or feedback is invalid');
            return;
        }
        setIsLoading(true);

        try {
            const response = await fetch("https://server-habit.onrender.com/feedback", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id,
                    feedback
                })
            })

            if (!response.ok) {
                const errorData = await response.json();
                setMessage(errorData.message || "Failed to send feedback.");
                return;
            }

            const data = await response.json();
            setMessage(data.message);  // Exibe a mensagem do backend: "Feedback sent successfully"

        } catch (error: any) {
            console.error("An error occurred:", error.message || error);
        } finally {
            setIsLoading(false); // Desativa o spinner, independentemente do sucesso ou erro
        }


        return message
    }

    return (
        <div data-state="active" data-orientation="horizontal" role="tabpanel" id="radix-:r0:-content-account" className="mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ">
            <div className="rounded-lg bg-card text-card-foreground">
                <div className="pt-4 space-y-4 flex flex-col">
                    <section className="flex">
                        <span className="font-bold">Email : </span>
                        <span className="ml-2"> {user?.email || "Loading"}</span>
                    </section>
                    <section className="flex">
                        <span className="font-bold">Name : </span>
                        <span className="ml-2"> {user?.name || "Loading"}</span>
                    </section>
                    <section className="pt-8">
                        <label htmlFor="feedback" className="text-card-foreground font-bold">
                            Send us your feedback
                        </label>
                        <textarea id="feedback" value={feedback} onChange={handleChange} className="mt-2 w-full p-2 border rounded-md bg-background resize-none focus:outline-none" rows={4} />
                        <button onClick={() => user?.id && handleFeedback(user?.id, feedback)} className="mt-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition">
                            {isLoading ? (
                                <div className="spinner-border animate-spin border-4 border-t-4 border-white w-6 h-6 rounded-full"></div> // Spinner
                            ) : (
                                "Submit Feedback"
                            )}
                        </button>
                    </section>
                    {message && (
                        <p className="text-center pt-5">{message}</p>
                    )}
                </div>
            </div>
        </div>
    )
}