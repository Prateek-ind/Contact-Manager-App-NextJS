import Link from "next/link"
import { ContactType } from "../_types/contacts"
import { FiEdit } from "react-icons/fi"
import DeleteButton from "./DeleteButton"
import { deleteContactAction } from "../actions/contacts"



const ContactsList = ({contacts}: {contacts: ContactType[]}) => {
  return (
    <div className=" max-w-md ">
        {contacts.map(contact => (
            <div key={contact.id} className="px-4 py-2 rounded-md mb-4
             flex items-start justify-between gap-4 border border-gray-200 shadow-sm">
                <div>
                    <h3><b>Name:</b> {contact.name}</h3>
                    <p><b>Email:</b> {contact.email}</p>
                </div>
                <div className="flex items-center self-center gap-3">
                    <Link href={`/contact/edit/${contact.id}`}
                     className="flex items-center gap-1 bg-blue-500 hover:bg-blue-700 text-white px-2 py-0.5 
                     rounded-md cursor-pointer text-sm"><FiEdit size={12}/>Edit</Link>
                    <DeleteButton  action={deleteContactAction}  contact={contact} /> 

                </div>
            </div>
        ))}

    </div>
  )
}

export default ContactsList