const ErrorLabel = ({error, children, ...props}) => {
    return(
        <label {...props}>
            {children}
            {error &&
                <p>{error}</p>
            }
        </label>
    )
}

export default ErrorLabel