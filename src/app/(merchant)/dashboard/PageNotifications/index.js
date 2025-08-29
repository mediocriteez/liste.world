"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { usePageNotifications } from "./Context"
import css from './index.module.css'

const StackItem = ({type, message}) => {
    return(
        <li>
            {message}
        </li>
    )
}

const PageNotifications = () => {

    const {
        stack,
        clearStack
    } = usePageNotifications()

    const timeoutDuration = 2001

    const notifContainerRef = useRef()
    const timeoutRef = useRef(null)
    const [clearing, setClearing] = useState(false)

    const clearingSequence = useCallback(() => {

        const onAnimationEnd = () => {
            timeoutRef.current = null
            clearStack()
            setClearing(false)
            notifContainerRef.current.removeEventListener('animationend', onAnimationEnd)
        }

        setClearing(true)
        notifContainerRef.current.addEventListener('animationend', onAnimationEnd)
    }, [])

    const initClearingSequence = useCallback(() => {timeoutRef.current = setTimeout(clearingSequence, timeoutDuration); console.log('ran')} , [])

    const onAnimationStart = useCallback(() => {
        // return
        if(timeoutRef.current !== null) return
        
        initClearingSequence()
    })

    useEffect(() => {
        if(timeoutRef.current === null || stack.length < 1) return
        
        clearTimeout(timeoutRef.current)
        initClearingSequence()
    }, [stack])

    return(
        <div className={css.root}>
            {stack.length > 0 && 
                <ul 
                    className={css.notificationContainer} 
                    onAnimationStart={onAnimationStart}
                    data-clearing={clearing}
                    ref={notifContainerRef}
                >
                    {
                        stack.map((n, i) => <StackItem key={i} type={n?.type} message={n.message}/>)
                    }
                </ul>
            }
        </div>
    )
}

export default PageNotifications