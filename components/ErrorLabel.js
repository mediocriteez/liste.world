const ErrorLabel = ({error, children, ...props}) => {
    return(
        <label {...props}>
            {children}
            {error &&
                <span data-role="error">{error}</span>
            }
        </label>
    )
}

export default ErrorLabel