'use client'
import { useActionState, useEffect, useState } from "react"
import { ContactType } from "../_types/contacts"
import {  useRouter } from "next/navigation"

type ContactFormProps = {
  action: (prevState: any, formData: FormData) => Promise<any>
  contact?: ContactType
}

const ContactForm = ({action, contact}: ContactFormProps) => {
  const [state, formAction] = useActionState(action, null)
  const router = useRouter()
  const [localState, setLocalState] = useState({
    name: '',
    email: ''
  })

  useEffect(() => {
    if(contact){
      setLocalState({
        name: contact.name,
        email: contact.email
      })
    }
  }, [contact])

  useEffect(() => {
    if(state?.success){
        router.push('/contact')
    }
  }, [state, router])

  const handleChange = (e: any)=>{
    setLocalState({
      ...localState,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div>
          <form action={formAction} className="space-x-4">
              <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Name
                  </label>
                  <input type="name" name="name"
                  placeholder="Enter your Name"
                  value={localState.name}
                  onChange={handleChange}
                  required
                  className="mt-1 px-2 py-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <label htmlFor="email" className=" mt-1 block text-sm font-medium text-gray-700">
                      Email
                  </label>
                  <input type="email" name="email"
                  placeholder="Enter your Email"
                  value={localState.email}
                  onChange={handleChange}
                  required
                  className="mt-1 px-2 py-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  {contact?.id && (
                    <input type="hidden" name="id" value={contact.id} />
                  )}

                    {contact?.userId && (
                    <input type="hidden" name="userId" value={contact.userId} />
                    )}
                  </div>
              <button type="submit" className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                  Submit
              </button>
              {state?.error && <p className="text-sm text-red-500">{state?.error}</p>}
          </form>
    </div>
  )
}

export default ContactForm