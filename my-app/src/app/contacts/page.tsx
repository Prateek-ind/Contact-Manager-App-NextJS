import { getSessionCookie } from "../_lib/session"
import ContactsList from "../_components/ContactsList"
import { getContacts } from "../api/contacts"
import Link from "next/link"
import { Suspense } from "react"


const ContactsPage = async() => {
  const user = await getSessionCookie()
  if(!user){
    return <div className="text-gray-700">Please{" "}
    <Link href="/login" className="text-blue-500 underline">login</Link> 
    {" "}to view your contacts.</div>
  }
  
  const contacts = await getContacts()
  console.log("FETCHED CONTACTS:", contacts)
  if(!contacts || contacts.length === 0){
    return <div className="text-gray-700">No contacts found. Please{" "} 
    <Link href="/contacts/new" className="text-blue-500 underline">add</Link> 
    {" "}some contacts.</div>
  }
  
  
  return (
    <>
    <div className="container mx-auto p-4 flex items-center justify-between">
      <h2 className="text-2xl font-bold mb-4">Hi {user.name}, here are your Contacts</h2>
      <Link href={'/contacts/new'} className="bg-blue-500 hover:bg-blue-700 text-white px-2 py-0.5 rounded-md cursor-pointer">Add Contacts</Link>

    </div>
    <Suspense fallback={<div className="text-gray-700">Loading contacts...</div>}>
    <ContactsList contacts={contacts} />
    </Suspense>

    </>
  )
}

export default ContactsPage