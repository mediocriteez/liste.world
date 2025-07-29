"use client"

import { useCallback, useMemo, useState } from "react"
import { schema } from "./zod"
import PasswordLiveCheck from "./PasswordLiveCheck"
import { supabase } from "@/services/supabase/client"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import ErrorLabel from "@/components/ErrorLabel"
import Link from "next/link"
import css from "./page.module.css"
import formCSS from '@/styles/form.module.css'
import { classNamesToStr } from "@/utils/index"
import PasswordVisibility from "@/components/SVG/PasswordVisibility/index-revision"
// import { createNewUser as onSubmit } from "./actions"

const formLabelClassName = formCSS.primaryText

const Signup = () => {

    const router = useRouter()

    const [formError , setFormError] = useState()

    const [passwordVisible, setPasswordVisible] = useState(false)
    const toggleVisibility = useCallback(() => setPasswordVisible(prev => !prev), [])
    const passwordInputType = useMemo(() => passwordVisible ? 'text' : 'password', [passwordVisible])
    
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
        <main className={css.main}>
            <div className={classNamesToStr(['channelWidth', 'centered'])}>
                <div style={{height: '300px'}}></div>
                <form onSubmit={handleSubmit(onSubmit, () => setFormError('Review errors and try again'))} autoComplete="off" className={css.form}>
                    <ErrorLabel error={errors?.phone?.message} className={formLabelClassName}>
                        <span data-role="label-text">phone number</span>
                        <span data-role="append-input">
                            <span>+1</span>
                            <input type="text" name="phone" {...register('phone')} />
                        </span>
                    </ErrorLabel>
                    <div className={formLabelClassName}>
                        <ErrorLabel className={''}>
                            <span data-role="label-text">password</span>
                            <span data-role="append-input">
                                <input type={passwordInputType} name="password" {...register('password')} />
                                <button type="button" onClick={toggleVisibility}><PasswordVisibility visible={passwordVisible} style={{height: '1.5lh'}}/></button>
                            </span>
                        </ErrorLabel>
                        <PasswordLiveCheck password={password}/>
                    </div>
                    <div className={formLabelClassName}>
                        <ErrorLabel>
                            <span data-role="label-text">confirm password</span>
                            <span data-role="append-input">
                                <input type={passwordInputType} name="confirm-password" {...register('confirmPassword')} />
                                <button type="button" onClick={toggleVisibility}><PasswordVisibility visible={passwordVisible} style={{height: '1.5lh'}}/></button>
                            </span>
                        </ErrorLabel>
                        <p>passwords match {password?.length > 0 && password === confirmPassword ? ':)' : 'X'}</p>
                    </div>
                    <ErrorLabel error={errors?.authorizeText?.message}>
                        <input type="checkbox" name="authorize-text" {...register('authorizeText')} />
                        <span>agree to receive a text message containing a one-time passcode to the provided phone number to verify your account {'(standard data and message rates may apply)'}</span>
                    </ErrorLabel>
                    <Link href="/about/preprodterms" style={{color: 'blue', textDecoration: 'underline'}}>review terms of service</Link>
                    {formError &&
                        <p>{formError}</p>
                    }
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </main>
    )
}

export default Signup