import AuthContext from "./AuthContext"

const Layout = ({children}) => {
    return(
        <AuthContext>
            {children}
        </AuthContext>
    )
}

export default Layout