import { supabase } from '@/services/supabase/client'
import css from './page.module.css'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { classNamesToStr } from '@/utils/index'
import mdxComponents from './components'

export const dynamic = 'force-static';

async function getPost(postID) {

  const url =   `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/posts` +
                `?select=title,created_at,updated_at,body` +
                `&id=eq.${postID}`

                console.log(url)

  const res = await fetch(url, {
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON,
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON}`,
    },
    cache: 'force-cache',
    next: { tags: ['posts', `post:${postID}`] },
  })

  console.log(res)

  if (!res.ok) throw new Error(`Failed to fetch post ${postID}`)
  const rows = await res.json()
  return rows?.[0] ?? null
}

const Page = async ({params}) => {

    const {postID} = await params

    let title, body, createdAt, updatedAt

    try{
        const data = await getPost(postID)
        if(data === null) return null
        
        title = data.title
        body = data.body

        const dateCreated = new Date(data.created_at)
        const dateUpdated = new Date(data.updated_at)
        createdAt = `${
                    String(dateCreated.getMonth() + 1).padStart(2, "0")
                } / ${
                    String(dateCreated.getDate()).padStart(2, "0")
                } / ${
                    String(dateCreated.getFullYear()).slice(-2) // last 2 digits
                }`
        updatedAt = `${
                    String(dateUpdated.getMonth() + 1).padStart(2, "0")
                } / ${
                    String(dateUpdated.getDate()).padStart(2, "0")
                } / ${
                    String(dateUpdated.getFullYear()).slice(-2) // last 2 digits
                }`
    }catch(e){
        console.error(e?.message)
        console.error(e)
    }

    return(
        <div className={classNamesToStr(['channelMaxWidth', 'centered', css.contentContainer])}>
            <div className={css.headerContent}>
                <h1>{title}</h1>
                <article className={css.contentMeta}>
                    <p><img data-role="author-avi" src="/images/avi.jpg"/><span data-role="author">Jacob Winter</span><span data-role="mini-text"> - founder/CEO</span></p>
                    <p data-role="mini-text">posted: <span data-role="focus">{createdAt}</span></p>
                    <p data-role="mini-text">last updated: <span data-role="focus">{updatedAt}</span></p>
                </article>
            </div>
            <MDXRemote source={body} components={mdxComponents}/>
            
        </div>
    )
}

export default Page