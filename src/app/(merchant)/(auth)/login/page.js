"use client"

import { useAuthContext } from "@/app/AuthContext"
import ErrorLabel from "@/components/ErrorLabel"
import { useCallback, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import css from './page.module.css'
import formCSS from '@/styles/form.module.css'
import PasswordVisibilityLock from "@/components/SVG/PasswordVisibilityLock"
import { classNamesToStr } from "@/utils/index"
import { zodResolver } from "@hookform/resolvers/zod"
import { schema } from "./zod"
import Link from "next/link"
import { supabase } from "@/services/supabase/client"
import { useRouter } from "next/navigation"

const Login = () => {

    const router = useRouter()
    const [formError , setFormError] = useState('')

     const {
        register,
        handleSubmit,
        formState: {
            isSubmitting
        }
    } = useForm({
        resolver: zodResolver(schema),
        mode: 'onBlur'
    })

    const {
        ref: phoneRef,
        onChange: rhfPhoneOnChange,
        ...restOfPhone
    } = register("phone");

    const [passwordVisible, setPasswordVisible] = useState(false)
    const toggleVisibility = useCallback(() => setPasswordVisible(prev => !prev), [])
    const passwordInputType = useMemo(() => passwordVisible ? 'text' : 'password', [passwordVisible])

    const onSubmit = useCallback(async (formData, something ) => {
        setFormError('')
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                phone: '1' + formData.phone,
                password: formData.password,
            })
            console.log(data)

            if(error?.code === 'phone_not_confirmed') return router.push(`/auth/2fa?id=1${formData.phone}&resend`)

            if(error) throw error
        } catch (error) {
            // console.log('error triggered')
            // console.error(error.message)
            console.error(error)
            setFormError(error.message)
        }
    }, [])

    const onSubmitErrors = useCallback(errors => {

        const flattened = []

        for(const field in errors){
            const {message} = errors[field]
            flattened.push(message)
        }

        setFormError(flattened)
    }, [])

    return(
        <div className={classNamesToStr(['channelWidth', 'centered', css.contentContainer])}>
            <div>
                <h2 style={{maxWidth: '350px', margin: '1em auto', fontFamily: 'var(--font-kanit)'}}>Liste<img style={{marginLeft: '2px', height: '.55lh', verticalAlign: 'middle'}} src="/images/logo_clean.svg" /></h2>
                <h1 style={{maxWidth: '350px', margin: '1em auto', fontSize: '1.25em'}}>Welcome Back!</h1>
                <form onSubmit={handleSubmit(onSubmit, onSubmitErrors)} autoComplete="off" className={css.form}>
                    <ErrorLabel className={formCSS.primaryText}>
                        <span data-role="label-text">phone number</span>
                        <span data-role="append-input">
                            <span style={{padding: '0 .1em'}}>+1</span>
                            <input 
                                type="number" 
                                name="phone" 
                                ref={phoneRef} 
                                onChange={(e) => {
                                    const {value} = e.currentTarget
                                    if(value.length > 10){
                                        e.currentTarget.value = value.slice(0,10)
                                        return
                                    }
                                    rhfPhoneOnChange(e)
                                }}
                                {...restOfPhone}
                                />
                        </span>
                    </ErrorLabel>
                    <ErrorLabel className={formCSS.primaryText}>
                        <span data-role="label-text">password</span>
                        <span data-role="append-input">
                            <input type={passwordInputType} name="password" {...register('password')} />
                            <button type="button" tabIndex="-1" onClick={toggleVisibility} aria-hidden="true"><PasswordVisibilityLock visible={passwordVisible} style={{height: '2lh'}}/></button>
                        </span>
                    </ErrorLabel>
                    {!isSubmitting && formError &&
                        <p className={formCSS.formError}>
                            <span data-role="title">Error:</span>
                            {
                                Array.isArray(formError) ?
                                
                                formError.map((error, i) => <span key={i}> {'>'} {error}</span>)
                                
                                :
                                
                                <span>{formError}</span>
                            }
                        </p>
                    }
                    <button type="submit" className={formCSS.submit}>Login</button>

                    <Link href="/auth/signup" style={{fontSize: '.85em', fontWeight: '300'}}>New to Liste? Sign up here</Link>
                </form>
            </div>
        </div>
    )
}

export default Login