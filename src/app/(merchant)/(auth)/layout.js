import css from './layout.module.css'

const Layout = ({children}) => {
    return(
        <main className={css.main}>
            {children}
        </main>
    )
}

export default Layout