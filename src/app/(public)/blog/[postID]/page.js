import { supabase } from '@/services/supabase/client'
import css from './page.module.css'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { classNamesToStr } from '@/utils/index'

const Page = async ({params}) => {

    const {postID} = await params

    let title, body

    try{
        const {data, error} = await supabase.from('posts').select('title, body').eq('id', postID).single()
        if(error) throw error
        
        title = data.title
        body = data.body
    }catch(e){
        console.error(error?.message)
        console.error(error)
    }

    return(
        <div className={classNamesToStr(['channelWidth', 'centered', css.contentContainer])}>
            <h1>{title}</h1>
            <MDXRemote source={body} />
        </div>
    )
}

export default Page