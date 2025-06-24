const AuthForm = ({schema}) => {

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting
        }
    } = useForm({
        resolver: zodResolver(schema)
    })

    return(
        <form>

        </form>
    )
}

export default AuthForm