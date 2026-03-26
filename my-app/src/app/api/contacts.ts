
import { getSessionCookie } from "../_lib/session"
import { ContactType } from "../_types/contacts"

const API_URL = 'http://localhost:4000'

export const getHeaders = async()=>{
    const session = await getSessionCookie()

    return ({
        "Content-Type": "application/json",
        'Authorization': `Bearer ${session?.token}`

    })
}

export const getContacts = async () => {
    
    try {
        const headers = await getHeaders()
        console.log("1: getting headers: ", headers);
        const response = await fetch(`${API_URL}/contacts`, {headers})
        if(!response.ok){
            console.log("2: not able to get response")
            throw new Error("Fetching contacts failed")
        }
        console.log("3: getting response: ", response);
        const data =await response.json()
        console.log("4: getting data: ", data);
        return data.contacts

    } catch (error: any) {
        console.log("5: error from catch")
        throw new Error(error.message || "Fetching contacts failed")}    
}

export const getContactsById = async (_id: string)=>{
   
    try {
        const headers = await getHeaders()
         const response = await fetch(`${API_URL}/contacts/${_id}`, {headers})
        if(!response.ok){
            throw new Error("Fetching contact failed")
        }
        const data =await response.json()
        return data.contact

    } catch (error: any) {
        throw new Error(error.message || "Fetching contact failed")
    }    
}

export const createContacts = async (contactsData: ContactType)=>{
    try {
        const headers = await getHeaders()
        const response = await fetch(`${API_URL}/contacts`, {
        method: 'POST',
        headers,
        body: JSON.stringify(contactsData)
    })

    if(!response.ok){
        throw new Error("Failed to create Contact")
    }
    const data = await response.json()

    return data.contact

    } catch (error: any) {
        throw new Error(error.message || "Failed to create Contact")
    }
}

export const updateContacts = async (_id: string, contactsData: ContactType)=>{
   try {
    const headers = await getHeaders()
        const response = await fetch(`${API_URL}/contacts/${_id}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(contactsData)
    })

    if(!response.ok){
        throw new Error("Failed to update Contact")
    }
    const data = await response.json()

    return data.contact
    
    } catch (error: any) {
        throw new Error(error.message || "Failed to update Contact")
    }
}

export const deleteContacts = async (_id: string)=>{
   try {
    const headers = await getHeaders()
        const response = await fetch(`${API_URL}/contacts/${_id}`, {
        method: 'DELETE',
        headers,
    })

    if(!response.ok){
        throw new Error("Failed to delete Contact")
    }
    const data = await response.json()

    return data.contact
    
    } catch (error: any) {
        throw new Error(error.message || "Failed to delete Contact")
    }
}

