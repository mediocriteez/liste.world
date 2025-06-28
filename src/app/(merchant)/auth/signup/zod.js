import { z } from "zod"

export const schema = z.object({
    phone: z.string().min(10, 'Phone number must be 10 digits long').max(10, 'Phone number must be 10 digits long'),
    password: z.string()
                .min(8, "Password must be at least 8 characters")
                .min(8, "Password must be at least 8 characters")
                .regex(/[A-Z]/, "Must include at least one uppercase letter")
                .regex(/[a-z]/, "Must include at least one lowercase letter")
                .regex(/[!@#$%^&*]/, "Must include at least one special character (!@#$%^&*)")
                .regex(/^[A-Za-z0-9!@#$%^&*]+$/, "Only letters, numbers, and !@#$%^&* are allowed"),
    confirmPassword: z.string(),
    authorizeText: z.literal(true, {
        errorMap: () => ({message: 'agree to recieve a one-time password by text to continue'})
    })
})
.refine((data) => {
    console.log(data.password, data.confirmPassword)
    return data.password === data.confirmPassword
}, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
})