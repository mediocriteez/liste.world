"use client"

import { useState } from "react"
import { z } from "zod"
import PasswordLiveCheck from "./PasswordLiveCheck"

const schema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string()
                .min(8, "Password must be at least 8 characters")
                .min(8, "Password must be at least 8 characters")
                .regex(/[A-Z]/, "Must include at least one uppercase letter")
                .regex(/[a-z]/, "Must include at least one lowercase letter")
                .regex(/[!@#$%^&*]/, "Must include at least one special character (!@#$%^&*)")
                .regex(/^[A-Za-z0-9!@#$%^&*]+$/, "Only letters, numbers, and !@#$%^&* are allowed"),
})
.refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
})

const Signup = () => {

    const [formError , setFormError] = useState()

    const {
        register,
        watch,
        handleSubmit,
        formState: {
            errors,
            touched,
            isSubmitting
        }
    } = useForm({
        resolver: zodResolver(schema)
    })

    const password = watch('password')

    return(
        <main>
            <form onSubmit={onSubmit}>
                <ErrorLabel error={errors.email}>
                    <span>email</span>
                    <input type="email" name="email" {...register('email')} />
                </ErrorLabel>
                <ErrorLabel>
                    <span>password</span>
                    <input type="email" name="email" {...register('password')} />
                </ErrorLabel>
                <PasswordLiveCheck password={password}/>
                <ErrorLabel>
                    <span>confirm password</span>
                    <input type="email" name="email" {...register('confirmPassword')} />
                </ErrorLabel>
            </form>
        </main>
    )
}

export default Signup