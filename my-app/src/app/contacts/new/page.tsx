import ContactForm from "@/app/_components/ContactForm"
import { createContactAction } from "../../actions/contacts"


const NewContactPage = () => {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="font-bold">Create New Contact</h1>
      <ContactForm  action={createContactAction}/>
    </div>
  )
}

export default NewContactPage