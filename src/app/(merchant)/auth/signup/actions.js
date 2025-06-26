"use server"

import { schema } from "./zod"

export const createNewUser = async (data) => {
    const {
        email,
        password,
        confirmPassword
    } = data

    try {
        const validation = schema.safeParse(data)

        if(!validation.success) throw {message: 'invalid data'}

        
        
    } catch (error) {
        console.error(error)
        return({error})
    }

}