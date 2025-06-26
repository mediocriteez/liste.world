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
    const isAuthRoute = useMemo(() => pathName.startsWith("/auth"), [pathName])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
            router.prefetch('/login')
            router.prefetch('/dashboard')
    }, [])

    useEffect(() => {

        if(fetchingSession) return

        if(session === null && !isAuthRoute) router.push(`/auth/login?redirect=${encodeURIComponent(pathName)}`)
        
        if(session && isAuthRoute) router.replace('/dashboard')

        setLoading(false)

    }, [session, fetchingSession])

    return( 
        <>
            {loading && !isAuthRoute
                ?
                <PageLoader />
                :
                children
            }
        </>
    )
}

export default AuthGate