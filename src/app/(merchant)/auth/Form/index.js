import ErrorLabel from "@/components/ErrorLabel"

const AuthForm = ({schema, onSubmit, confirmPass = false}) => {

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            touched,
            isSubmitting
        }
    } = useForm({
        resolver: zodResolver(schema)
    })

    return(
        <form onSubmit={onSubmit}>
            <ErrorLabel>
                <span>email</span>
                <input type="email" name="email" {...register('email')} />
            </ErrorLabel>
            <ErrorLabel>
                <span>password</span>
                <input type="email" name="email" {...register('password')} />
            </ErrorLabel>
            {confirmPass &&
                <ErrorLabel>
                    <span>confirm password</span>
                    <input type="email" name="email" {...register('confirmPassword')} />
                </ErrorLabel>
            }
            
        </form>
    )
}

export default AuthForm