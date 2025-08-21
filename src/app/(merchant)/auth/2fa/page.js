"use client"

import ErrorLabel from "@/components/ErrorLabel"
import { supabase } from "@/services/supabase/client"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useRef, useState } from "react"
import css from './page.module.css'
import { classNamesToStr } from "@/utils/index"

const TwoFactorAuthentication = () => {

    const searchParams = useSearchParams()
    const phone = searchParams.get('id')

    const inputRef = useRef();
    const [formError, setFormError] = useState('')
    const [code, setCode] = useState('')

    const verifyOtp = useCallback(async (token) => {
        inputRef.current.blur()
        try {
            const { error } = await supabase.auth.verifyOtp({ phone, token, type: 'sms'})
            if(error) throw error
        } catch (error) {
            console.error(error)
            setFormError(error.message)
        }
    }, [searchParams])

    useEffect(() => {
        if(code.length !== 6) return

        verifyOtp(code)
    }, [code])

    return(
        <div className={classNamesToStr(['channelWidth', 'centered'])}>
            <h1 className={css.h1}>2FA</h1>
            <form onSubmit={e => e.preventDefault()}>
                <p>enter the code we sent to your number</p>
                <div className={css.inputContainer}>
                        <input
                            ref={inputRef} 
                            type="text"
                            inputMode="numberic"
                            autoComplete="one-time-code"
                            name="2fa-code" 
                            value={code} 
                            onChange={e => /^\d{0,6}$/.test(e.target.value) && setCode(e.target.value)}
                            autoFocus
                        />
                    {[1,2,3,4,5,6].map(n => (
                        <span 
                            key={n} 
                            className={css.psuedoInput}
                            data-focused={code?.length === n - 1}
                        >
                            {code?.[n - 1]}
                        </span>
                    ))}
                </div>
                {formError &&
                    <p className={css.formError}>
                        <span data-role="title">Error:</span>
                        {
                            Array.isArray(formError) ?

                            formError.map((error, i) => <span key={i}> {'>'} {error}</span>)

                            :

                            <span>{formError}</span>
                        }
                    </p>
                }
            </form>
        </div>
    )
}

export default TwoFactorAuthentication