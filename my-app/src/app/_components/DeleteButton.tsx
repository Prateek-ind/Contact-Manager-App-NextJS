'use client'
import { FiTrash } from "react-icons/fi"
import { ContactType } from "../_types/contacts"
import { useActionState } from "react"

type DeleteButtonProps = {
    action: (prevState: any, formData: FormData) => Promise<any>
  contact: ContactType
}

const DeleteButton = ({ action, contact }: DeleteButtonProps) => {
    const [state, formAction] = useActionState(action, null)
  return (
    <form  action={formAction} onSubmit={(e)=>{
        if(!confirm("Are you sure you want to delete this contact?")){
          e?.preventDefault()
        }
     }}>
        <input type="hidden" name="id" value={contact._id} />
        <button type="submit" className="flex items-center gap-1 bg-red-500 hover:bg-red-700 text-white px-2 py-0.5 rounded-md cursor-pointer text-sm"
     ><FiTrash size={12}
     /> Delete</button>
    </form>
    
  )
}

export default DeleteButton