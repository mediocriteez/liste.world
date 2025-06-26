const CheckItem = ({children, fulfilled}) => {
    return(
        <li>
            {children}
            <span>
                {fulfilled 
                    ? 
                    ':)'
                    :
                    'X'
                }
            </span>
        </li>
    )
}

export default CheckItem