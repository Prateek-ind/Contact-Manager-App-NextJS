'use server'

import { redirect } from "next/navigation"
import { deleteSessionCookie, setSessionCookie } from "../_lib/session"


const API_URL = 'http://localhost:4000'

export const LoginAction = async (formData: FormData) => {
    const email = (formData.get('email') as string).trim()
    const password = (formData.get('password') as string).trim()


    try {
        
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password}),
        })

        

        if (!response.ok) {
            throw new Error('Invalid credentials')
        }

       const data = await response.json() 

       await setSessionCookie({
        id: data.user._id,
        name: data.user.name,
        email: data.user.email,
        token: data.token,
       })

  

        redirect(`/`)
        
    }catch (error) {
        console.error('Login failed', error.message)
        redirect('/login')
    }
}

export const RegisterAction = async(formData: FormData)=>{
    const name = (formData.get('name') as string).trim()
    const email = (formData.get('email') as string).trim()
    const password = (formData.get('password') as string).trim()
    const confirmPassword = (formData.get('confirm-password') as string).trim()

    
    try{
        if(password!==confirmPassword){
        redirect('/register')
        }

        const response = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name, email, password})
        })

        if(!response.ok){
            throw new Error("Registration failed")
        }
        const data = await response.json()

        await setSessionCookie({
        id: data.user._id,
        name: data.user.name,
        email: data.user.email,
        token: data.token,
        })

        redirect('/contacts')
    }
    catch(error: any){
        console.log(error.message)
        redirect("/register")
    }
}

export const LogoutAction = async ()=>{
    // Clear session or cookie here
    await deleteSessionCookie()
    redirect('/login')  
}