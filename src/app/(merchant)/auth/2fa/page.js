"use client"

import ErrorLabel from "@/components/ErrorLabel"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

const TwoFactorAuthentication = () => {

    const searchParams = useSearchParams()
    const phone = searchParams.get('id')

    const [formError, setFormError] = useState('')
    const [code, setCode] = useState('')

    const verifyOtp = useCallback(async (token) => {
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
        <main>
            <form>
                <ErrorLabel> 
                    <span>code</span>
                    <input 
                        type="number"
                        name="2fa-code" 
                        value={code} 
                        onChange={e => /^\d{0,6}$/.test(e.target.value) && setCode(e.target.value)}
                        autoFocus
                    />
                </ErrorLabel>
                {formError &&
                    <p>{formError}</p>
                }
            </form>
        </main>
    )
}

export default TwoFactorAuthentication