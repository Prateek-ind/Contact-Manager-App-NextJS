'use server'
import { revalidatePath } from "next/cache"
import { createContacts, deleteContacts, updateContacts } from "../api/contacts"
import { getSessionCookie } from "../_lib/session"
import { ContactType } from "../_types/contacts"

export const createContactAction = async(prevState: any, formData: FormData): Promise<any> => {

    if(!formData){
        return { error: 'Form data is missing' }
    }

    const user = await getSessionCookie()

    const newContact: ContactType ={
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        userId: user?.id || '',
    }

    try{
        await createContacts(newContact)
        revalidatePath('/contact')
        return { success: true }
    } catch (error) {
        console.log("Error creating contact:", error)
        return { error: 'Failed to create contact. Please try again.' }
    }
}


export const editContactAction = async (prevState: any, formData: FormData) => {
    
    const id = formData.get('id') as string
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const userId = formData.get('userId') as string

    const updatedContact = {
        name,
        email,
        userId
    }

    try{
        await updateContacts(id, updatedContact)
        revalidatePath('/contact')
        return { success: true }
    } catch (error) {
        console.log("Error edited contact:", error)
        return { error: 'Failed to edit contact. Please try again.' }
    }
    
}


export const deleteContactAction = async (prevState: any, formData: FormData) => {

    const id = formData.get('id') as string
    try {
        await deleteContacts(id)
        revalidatePath('/contact')
        return { success: true }
    } catch (error) {
        console.log("Error deleting contact:", error)
        return { error: 'Failed to delete contact. Please try again.' }
    }
}