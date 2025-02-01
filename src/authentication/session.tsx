import 'server-only'
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation';


let key = new TextEncoder().encode(process.env.SESSION_SECRET)

const cookie = {
    name : 'session',
    options : { httpOnly : true, secure: true, sameSite : 'none' as const , path : '/'},
    durations : 24 * 60 * 60 * 1000,
}

export async function encrypt(payload: any){
    return new SignJWT(payload)
        .setProtectedHeader({alg : 'HS256'})
        .setIssuedAt()
        .setExpirationTime('1day')
        .sign(key)
}

export async function decrypt(session: any) {
    try {
        const { payload } = await jwtVerify(session, key, {
            algorithms : ['HS256'],
        })

        return payload
    } catch (error) {
        // console.error('Failed to verify session', error)
        return null;
    }
}

export async function createSession(userId: string){
    let session;
    
    try {
        const expires = new Date(Date.now() + cookie.durations);
        session = await encrypt({ userId, expires });

        const cookieStore = await cookies();
        cookieStore.set(cookie.name, session, { ...cookie.options, expires });

    } catch (error) {
        console.error("Error during session creation:", error);
    } 
}

export async function verifySession(){

    let userId;

    try{
        const cookieStore = (await cookies()).get(cookie.name)?.value;
        const session = await decrypt(cookieStore);

        if (!session?.userId) {
            throw new Error('User not authenticated');
        }

        userId = session.userId;
    }catch(error){
        console.error("Error during session handling:", error);
    }

    if (!userId) {
        redirect('/login');
    }

    return { userId }
}

