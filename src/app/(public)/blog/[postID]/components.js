import Link from "next/link"

const mdxComponents = {
    a: ({ node, href, children, ...props }) => {
        // external links should still use <a>
        const isInternal = href?.startsWith("/")
        if (isInternal) {
        return (
            <Link href={href} {...props}>
            {children}
            </Link>
        )
        }
        return (
        <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
            {children}
        </a>
        )
    },
}

export default mdxComponents