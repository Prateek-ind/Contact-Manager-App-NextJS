'use client'

import { useRouter } from "next/navigation"
import { LogoutAction } from "../actions/auth"

const LogoutButton = () => {
  const router=  useRouter()
  const HandleLogout = async ()=> {
    try {
      await LogoutAction()
    } catch (error) {
      console.log("Logout failed", error)
    }
    
  }
  return (
    <button className="px-4 py-2 bg-red-500 text-white rounded-md transition-colors hover:bg-red-700 cursor-pointer"
      onClick={HandleLogout}>LogoutButton</button>
  )
}

export default LogoutButton