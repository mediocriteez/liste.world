"use client"

import { supabase } from "@/services/supabase/client"
import { createContext, useCallback, useContext, useEffect, useState } from "react"

const Context = createContext()

const AuthContext = ({children}) => {
    const [user, setUser] = useState(undefined)
    const [session, setSession] = useState(undefined)
    const [fetchingSession, setFetchingSession] = useState(true)

    useEffect(() => {

        const { data } = supabase.auth.onAuthStateChange((event, session) => {
            console.log(event, session)
            if (event === 'INITIAL_SESSION') {
                // handle initial session
                setSession(session)
                setFetchingSession(false)
            } else if (event === 'SIGNED_IN') {
                // handle sign in event
                setSession(session)
            } else if (event === 'SIGNED_OUT') {
                setUser(null)
                setSession(null)
            } else if (event === 'PASSWORD_RECOVERY') {
                // handle password recovery event
            } else if (event === 'TOKEN_REFRESHED') {
                // handle token refreshed event
            } else if (event === 'USER_UPDATED') {
                // handle user updated event
            }
        })

        return () => data.subscription.unsubscribe()
    }, [])

    const value = {
        fetchingSession,
        session,
        setSession
    }

    return(
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

export const useAuthContext = () => useContext(Context)

export default AuthContext