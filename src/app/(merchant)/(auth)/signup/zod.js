import { z } from "zod"

export const schema = z.object({
    phone: z.string().min(10, 'phone number must be 10 digits long').max(10, 'phone number must be 10 digits long'),
    password: z.string()
                .min(8, "password must be at least 8 characters")
                .min(8, "password must be at least 8 characters")
                .regex(/[A-Z]/, "password must include at least one uppercase letter")
                .regex(/[a-z]/, "password must include at least one lowercase letter")
                .regex(/[!@#$%^&*]/, "password must include at least one special character (!@#$%^&*)")
                .regex(/^[A-Za-z0-9!@#$%^&*]+$/, "password can only letters, numbers, and !@#$%^&* are allowed"),
    confirmPassword: z.string(),
    authorizeText: z.literal(true, {
        errorMap: () => ({message: 'agree to recieve a one-time password by text to continue'})
    })
})
.refine((data) => {
    console.log(data.password, data.confirmPassword)
    return data.password === data.confirmPassword
}, {
    message: 'passwords do not match',
    path: ['confirmPassword']
})