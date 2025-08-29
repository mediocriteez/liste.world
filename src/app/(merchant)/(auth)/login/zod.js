import { z } from "zod"

export const schema = z.object({
    phone: z.string().min(10, 'phone number must be 10 digits long').max(10, 'phone number must be 10 digits long'),
    password: z.string()
})