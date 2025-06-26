"use client"

import { useAuthContext } from "@/app/AuthContext"
import ErrorLabel from "@/components/ErrorLabel"
import { useState } from "react"
import { useForm } from "react-hook-form"

const Login = () => {

    const [formError , setFormError] = useState('')

     const {
        register,
        handleSubmit,
        formState: {
            isSubmitting
        }
    } = useForm()

    const {setSession} = useAuthContext()

    return(
        <main>
            <form>
                <ErrorLabel>
                    <span>email</span>
                    <input type="email" name="email" {...register('email')} />
                </ErrorLabel>
                <ErrorLabel>
                    <span>password</span>
                    <input type="email" name="email" {...register('password')} />
                </ErrorLabel>
                <button type="submit">Log In</button>
                {formError &&
                    <p>{formError}</p>
                }
            </form>
        </main>
    )
}

export default Login