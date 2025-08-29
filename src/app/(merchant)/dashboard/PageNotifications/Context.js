"use client"

import { createContext, useCallback, useContext, useEffect, useState } from 'react'

const PageNotificationContext = createContext()

const PageNotificationsProvider = ({children}) => {

    const [stack, setStack] = useState([])
    const [stackBlocked, setStackBlocked] = useState(false)
    const addToStack = useCallback(newNotif => !stackBlocked && setStack(prev => [...prev, newNotif]), [stackBlocked])
    const clearStack = useCallback(() => setStack([]), [])
    const blockStack = useCallback(() => setStackBlocked(true), [])

    useEffect(() => {
        if(!stackBlocked) return
        setTimeout(() => setStackBlocked(false), 2000)
    }, [])

    return(
        <PageNotificationContext.Provider value={{stack, addToStack, clearStack, blockStack}}>
            {children}
        </PageNotificationContext.Provider>
    )
}

export const usePageNotifications = () => useContext(PageNotificationContext)

export default PageNotificationsProvider