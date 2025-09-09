"use client"

import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
import css from './index.module.css'
import { classNamesToStr } from "@/utils/index"
import Spinner from "@/components/loaders/Spinner"
import { supabase } from "@/services/supabase/client"

const convertDate = dateStr => {
    const date = new Date(dateStr)

    return `${
                String(date.getMonth() + 1).padStart(2, "0")
            } / ${
                String(date.getDate()).padStart(2, "0")
            } / ${
                String(date.getFullYear()).slice(-2) // last 2 digits
            }`
}

const BlogFeature = ({}) => {

    const [loading, setLoading] = useState(true)
    const [posts, setPosts] = useState([])

    const fetchLastUpdated = useCallback(async () => {
        try {
            const {data, error} = await supabase.from('posts').select('id, title, created_at').order('created_at', {ascending: false}).limit(5)
            if(error) throw error
            setPosts(data)
            setLoading(false)
            // const {id, created_at, title} = data
            
            // setPostID(id)
            // setPostTitle(title)

            // const date = new Date(created_at)
            // setLastUpdated(
            //     `${
            //         String(date.getMonth() + 1).padStart(2, "0")
            //     } / ${
            //         String(date.getDate()).padStart(2, "0")
            //     } / ${
            //         String(date.getFullYear()).slice(-2) // last 2 digits
            //     }`
            // )
        } catch (error) {
            console.error(error)
        }
        }, [])
    
        useEffect(() => {
            fetchLastUpdated()
        }, [])

    if(loading) return(
        <div>
            <div className={(classNamesToStr[css.root, css.loader])}><Spinner /></div>
        </div>
    )

    return(
        <div className={css.contentContainer}>
            {posts.map(p => {
                return(
                    <Link key={p.id} href={`/blog/${p.id}`} className={css.root}>
                        <article>
                            <p className={css.postID}>{p.id}</p>
                            <h3>{p.title}</h3>
                            <p className={css.date}>{convertDate(p.created_at)}</p>
                        </article>
                    </Link>
                )
            })}
        </div>
    )
}

export default BlogFeature