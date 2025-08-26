"use client"

import { useAuthContext } from "@/app/AuthContext"
import PageLoader from "@/components/PageLoader"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"

const AuthGate = ({children}) => {

    const {
        session,
        fetchingSession
    } = useAuthContext()

    const router = useRouter()
    const pathName = usePathname()

    useEffect(() => {

        if(fetchingSession) return

        const isAuthRoute = pathName.startsWith("/auth")

        if(session === null && !isAuthRoute) router.replace(`/auth/login?redirect=${encodeURIComponent(pathName)}`)
        
        if(session && isAuthRoute) router.replace('/dashboard')

    }, [session, fetchingSession])

    return( 
        <>
            {children}
        </>
    )
}

export default AuthGate