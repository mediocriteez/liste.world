"use client"

import { usePathname, useRouter } from "next/navigation"
import { createContext, useCallback, useContext, useEffect, useState } from "react"

const Context = createContext()

const AuthContext = ({children}) => {

    const router = useRouter()
    const pathName = usePathname()

    const [session, setSession] = useState()
    
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
    }, [session])

    const value = {
        session
    }

    return(
        <Context.Provider value={value}>
            
            {session === null 
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