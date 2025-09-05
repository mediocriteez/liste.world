import { supabase } from '@/services/supabase/client'
import css from './page.module.css'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { classNamesToStr } from '@/utils/index'

const Page = async ({params}) => {

    const {postID} = await params

    let title, body, createdAt, updatedAt

    try{
        const {data, error} = await supabase.from('posts').select('title, created_at, updated_at, body').eq('id', postID).single()
        if(error) throw error
        
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
        console.error(error?.message)
        console.error(error)
    }

    return(
        <div className={classNamesToStr(['channelMaxWidth', 'centered', css.contentContainer])}>
            <div className={css.headerContent}>
                <h1>{title}</h1>
                <article className={css.contentMeta}>
                    <p><img data-role="author-avi" src=""/><span data-role="author">Jacob Winter</span><span data-role="author-label"> - founder/CEO</span></p>
                    <p>posted: <span data-role="focus">{createdAt}</span></p>
                    <p>last updated: <span data-role="focus">{updatedAt}</span></p>
                </article>
            </div>
            <MDXRemote source={body} />
            
        </div>
    )
}

export default Page