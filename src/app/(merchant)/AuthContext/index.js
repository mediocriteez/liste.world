"use client"

import PageLoader from "@/components/PageLoader"
import { supabase } from "@/services/supabase/client"
import { usePathname, useRouter } from "next/navigation"
import { createContext, useCallback, useContext, useEffect, useState } from "react"

const Context = createContext()

const AuthContext = ({children}) => {

    const router = useRouter()
    const pathName = usePathname()

    const [loading, setLoading] = useState(true)
    const [session, setSession] = useState(undefined)
    
    const fetchSession = useCallback(async () => {
        try {
            const { data, error } = await supabase.auth.getSession()
            if(error) throw error
            setSession(data.session)
        } catch (error) {
            console.error(error)
        }
    }, [])

    useEffect(() => {
        fetchSession()
    }, [])

    useEffect(() => {

        const isAuthRoute = pathName.startsWith("/auth")

        if(session === null && !isAuthRoute) router.push(`/auth/login?redirect=${encodeURIComponent(pathName)}`)
        
        if(session && isAuthRoute) router.replace('/dashboard')

        setLoading(false)
    }, [session])

    const value = {
        session
    }

    return(
        <Context.Provider value={value}>
            
            {loading
                ?
                <PageLoader />
                :
                children
            }

        </Context.Provider>
    )
}

const useAuthContext = () => useContext(Context)

export default AuthContext