"use client"

import { useAuthContext } from "@/app/(merchant)/AuthContext"
import Link from "next/link"
import css from './index.module.css'

const AuthLinks = ({}) => {

    const {
        session
    } = useAuthContext()

    return(
        <div className={css.root}>
            {!session 
                ?
                    <>
                    <Link href="/login">log in</Link>
                    <Link href="/signup" data-appearance="feature">get 3 months free</Link>
                    </>

                :

                    <Link href="/dashboard">dashboard</Link>    
                
            }
        </div>
    )
}

export default AuthLinks