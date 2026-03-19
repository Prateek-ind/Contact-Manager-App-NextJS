'use server'

import axios from "axios"
import { redirect } from "next/navigation"
import { deleteSessionCookie, setSessionCookie } from "../_lib/session"
import {  UserType } from "../_types/user"

const API_URL = 'http://localhost:3001'

export const LoginAction = async (formData: FormData) => {
    const email = (formData.get('email') as string).trim()
    const password = (formData.get('password') as string).trim()

    try {
        // 👉 get ALL users
        const response = await axios.get(`${API_URL}/users`)

        console.log("ALL USERS:", response.data)

        // 👉 filter manually
        const user = response.data.find(
            (u: UserType) => u.email === email && u.password === password
        )

        console.log("MATCHED USER:", user)

        if (!user) {
            throw new Error('Invalid credentials')
        }
        await setSessionCookie({name: user.name, email: user.email, id: user.id})

        redirect(`/`)
        
    } catch (error) {
        console.error('Login failed', error)
        redirect('/')
    }
}

export const LogoutAction = async ()=>{
    // Clear session or cookie here
    await deleteSessionCookie()
    redirect('/login')  
}