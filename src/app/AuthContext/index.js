"use client"

import PageLoader from "@/components/PageLoader"
import { supabase } from "@/services/supabase/client"
import { usePathname, useRouter } from "next/navigation"
import { createContext, useCallback, useContext, useEffect, useState } from "react"

const Context = createContext()

const AuthContext = ({children}) => {

    

    const [session, setSession] = useState(undefined)
    const [fetchingSession, setFetchingSession] = useState(true)
    
    const fetchSession = useCallback(async () => {
        try {
            const { data, error } = await supabase.auth.getSession()
            if(error) throw error
            setSession(data.session)
        } catch (error) {
            console.error(error)
        }

        setFetchingSession(false)
    }, [])

    useEffect(() => {
        fetchSession()
    }, [])

    const value = {
        fetchingSession,
        session
    }

    return(
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

export const useAuthContext = () => useContext(Context)

export default AuthContext