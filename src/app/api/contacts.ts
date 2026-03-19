import axios from "axios"
import { ContactType } from "../_types/contacts"

const API_URL = 'http://localhost:3001'

export const getContacts = async (userId: string) => {
    

    const response = await axios.get(`${API_URL}/contacts`)

    const filtered = response.data.filter(
        (c: ContactType) => String(c.userId).trim() === userId
    )

    return filtered
}

export const getContactsById = async (id: string)=>{
    const response = await axios.get(`${API_URL}/contacts`)
    const filtered = response.data.filter(
        (c: ContactType) => String(c.id).trim() === id
    )
    return filtered[0]
}

export const createContacts = async (contactsData: ContactType)=>{
    const response = await axios.post(`${API_URL}/contacts`, contactsData)
    return response.data
}

export const updateContacts = async (id: string,contactsData: ContactType)=>{
    const response = await axios.put(`${API_URL}/contacts/${id}`, contactsData)
    return response.data
}

export const deleteContacts = async (id: string)=>{
    const response = await axios.delete(`${API_URL}/contacts/${id}`)

    return response.data
}

