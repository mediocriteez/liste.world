"use client"

import { supabase } from "@/services/supabase/client"
import { useCallback, useEffect, useState } from "react"
import css from './index.module.css'
import Link from "next/link"

const LastUpdated = ({}) => {
    const [postTitle, setPostTitle] = useState('')
    const [lastUpdated, setLastUpdated] = useState('-- / -- / --')

    const fetchLastUpdated = useCallback(async () => {
        try {
            const {data, error} = await supabase.from('posts').select('title, created_at').order('created_at', {ascending: false}).limit(1).single()
            if(error) throw error
            const {created_at, title} = data

            setPostTitle(title)

            const date = new Date(created_at)
            setLastUpdated(
                `${
                    String(date.getMonth() + 1).padStart(2, "0")
                } / ${
                    String(date.getDate()).padStart(2, "0")
                } / ${
                    String(date.getFullYear()).slice(-2) // last 2 digits
                }`
            )
        } catch (error) {
            console.error(error)
        }
    }, [])

    useEffect(() => {
        fetchLastUpdated()
    }, [])

    return(
        <article className={css.root}>
            <Link href="">
                <h3>{postTitle}</h3>
                <p>{lastUpdated}</p>
            </Link>
        </article>
    )
}

export default LastUpdated