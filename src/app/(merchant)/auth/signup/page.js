"use client"

import { useCallback, useState } from "react"
import { schema } from "./zod"
import PasswordLiveCheck from "./PasswordLiveCheck"
import { supabase } from "@/services/supabase/client"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import ErrorLabel from "@/components/ErrorLabel"
import Link from "next/link"
// import { createNewUser as onSubmit } from "./actions"

const Signup = () => {

    const router = useRouter()

    const [formError , setFormError] = useState()

    const {
        register,
        watch,
        handleSubmit,
        formState: {
            errors,
            isSubmitting
        }
    } = useForm({
        resolver: zodResolver(schema),
        mode: 'onBlur'
    })

    const [password, confirmPassword] = watch(['password', 'confirmPassword'])

    const onSubmit = useCallback(async (formData, something ) => {
        try {

            const {data, error} = await supabase.auth.signUp({
                phone: '1' + formData.phone,
                password: formData.password,
                options: {
                    channel: 'sms'
                }
            })

            if(error) throw error

            const phone = data?.user?.phone

            router.push(`/auth/2fa?id=${phone}&signup`)

        } catch (error) {
            console.error(error)
            setFormError(error.message)
        }
    }, [])
    // console.log(errors)
    return(
        <main>
            <form onSubmit={handleSubmit(onSubmit, () => setFormError('Review errors and try again'))}>
                <ErrorLabel error={errors?.phone?.message}>
                    <span>phone number</span>
                    <span>
                        <span>+1</span>
                        <input type="text" name="phone" {...register('phone')} />
                    </span>
                </ErrorLabel>
                <ErrorLabel>
                    <span>password</span>
                    <input type="text" name="password" {...register('password')} />
                </ErrorLabel>
                <PasswordLiveCheck password={password}/>
                <ErrorLabel>
                    <span>confirm password</span>
                    <input type="text" name="confirm-password" {...register('confirmPassword')} />
                </ErrorLabel>
                <p>passwords match {password === confirmPassword ? ':)' : 'X'}</p>
                <ErrorLabel error={errors?.authorizeText?.message}>
                    <input type="checkbox" name="authorize-text" {...register('authorizeText')} />
                    <span>agree to receive a text message containing a one-time passcode to the provided phone number to verify your account {'(standard data and message rates may apply)'}</span>
                </ErrorLabel>
                <Link href="/about/preprodterms">review terms of service</Link>
                {formError &&
                    <p>{formError}</p>
                }
                <button type="submit">Sign Up</button>
            </form>
        </main>
    )
}

export default Signup