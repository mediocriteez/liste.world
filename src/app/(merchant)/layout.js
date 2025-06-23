import AuthContext from "./AuthGate"

const Layout = ({children}) => {
    return(
        <AuthContext>
            {children}
        </AuthContext>
    )
}

export default Layout