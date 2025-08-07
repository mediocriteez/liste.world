"use server"

import { schema } from "./zod"

export const createNewUser = async (data) => {

    try {
        const validation = schema.safeParse(data)
        console.log(validation)
        if(!validation.success) throw {message: 'invalid data'}

        
        
    } catch (error) {
        console.error(error)
        return({error})
    }

}