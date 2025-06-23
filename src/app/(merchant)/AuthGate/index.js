"use client"

import { useAuthContext } from "@/app/AuthContext"
import PageLoader from "@/components/PageLoader"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"

const AuthGate = ({children}) => {

    const {
        session,
        fetchingSession
    } = useAuthContext()

    const router = useRouter()
    const pathName = usePathname()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
            router.prefetch('/login')
            router.prefetch('/dashboard')
    }, [])

    useEffect(() => {

        if(fetchingSession) return

        const isAuthRoute = pathName.startsWith("/auth")

        if(session === null && !isAuthRoute) router.push(`/auth/login?redirect=${encodeURIComponent(pathName)}`)
        
        if(session && isAuthRoute) router.replace('/dashboard')

        setLoading(false)

    }, [session, fetchingSession])

    return( 
        <>
            {loading
                ?
                <PageLoader />
                :
                children
            }
        </>
    )
}

export default AuthGate