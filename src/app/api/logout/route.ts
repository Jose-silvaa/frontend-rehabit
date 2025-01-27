import { deleteSession } from '@/authentication/session';

export async function GET(request : Request) {  
    deleteSession();

    return new Response(JSON.stringify({ message: "Logout realizado com sucesso!" }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
