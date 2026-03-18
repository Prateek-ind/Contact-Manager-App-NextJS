import { cookies } from "next/headers";
import { SessionUserType } from "../_types/user";


//set session cookie
export const setSessionCookie = async(user: SessionUserType)=>{
     (await cookies()).set("session", JSON.stringify(user), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 7 day
        path: "/",
    })
}

//get session cookie
export const getSessionCookie = async(): Promise<SessionUserType | null> => {
    const session = (await cookies()).get("session")?.value;
    if(!session){
        return null;
    }
    const user = JSON.parse(session) as SessionUserType;
    return user;

}

//delete session cookie
export const deleteSessionCookie = async()=>{
    const cookieStore = cookies();
    //  (await cookieStore).delete("session")
    (await cookieStore).set("session", "", { maxAge: 0, path: "/" })
}
