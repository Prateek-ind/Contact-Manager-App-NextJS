import ContactForm from '@/app/_components/ContactForm'
import { editContactAction } from '../../../actions/contacts'
import { getContactsById } from '../../../api/contacts'


 

const EditContactPage = async({params}: {params: Promise<{id: string}> }) => {
  const {id} = await params
  const contact = await getContactsById(id)
  return (
     <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="font-bold">Edit Contact</h1>
      <ContactForm  action={editContactAction} contact={contact}/>
    </div>
  )
}

export default EditContactPage