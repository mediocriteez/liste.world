"use client"

import { supabase } from "@/services/supabase/client"
import { useCallback, useEffect, useState } from "react"
import css from './index.module.css'
import Link from "next/link"

const LastUpdated = ({}) => {
    const [postID, setPostID] = useState('#')
    const [postTitle, setPostTitle] = useState('----------')
    const [lastUpdated, setLastUpdated] = useState('-- / -- / --')

    const fetchLastUpdated = useCallback(async () => {
        try {
            const {data, error} = await supabase.from('posts').select('id, title, created_at').order('created_at', {ascending: false}).limit(1).single()
            if(error) throw error
            const {id, created_at, title} = data
            
            setPostID(id)
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
        <Link href={`/blog/${postID}`} className={css.root}>
            <article >
                    <p className={css.postID}>{postID}</p>
                    <h3>{postTitle}</h3>
                    <p className={css.date}>{lastUpdated}</p>
            </article>
        </Link>
    )
}

export default LastUpdated