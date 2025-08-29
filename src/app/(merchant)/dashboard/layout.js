import css from './layout.module.css'
import PageNotifications from './PageNotifications'
import PageNotificationProvider from './PageNotifications/Context'

const Layout = ({children}) => {
    return(
        <PageNotificationProvider>
            <main className={css.main}>
                {children}
            </main>
            <PageNotifications />
        </PageNotificationProvider>
    )
}

export default Layout