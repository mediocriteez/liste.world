"use client"

import { MDXRemote } from 'next-mdx-remote'

const Content = ({title, body}) => {
    return(
        <>
            <h1>{title}</h1>
            <MDXRemote source={body} />
        </>
    )
}

export default Content