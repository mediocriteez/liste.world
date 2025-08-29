import css from './layout.module.css'

const Layout = ({children}) => {
    return(
        <div className={css.root}>
            {children}
        </div>
    )
}

export default Layout