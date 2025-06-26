const ErrorLabel = ({error, children, ...props}) => {
    return(
        <label {...props}>
            {children}
            {error &&
                <span>{error}</span>
            }
        </label>
    )
}

export default ErrorLabel