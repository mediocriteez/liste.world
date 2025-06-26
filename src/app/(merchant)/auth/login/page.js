"use client"

import { useState } from "react"

const Login = () => {

    const [formError , setFormError] = useState()

     const {
        register,
        handleSubmit,
        formState: {
            isSubmitting
        }
    } = useForm()

    return(
        <main>
            <form>
                <ErrorLabel>
                    <span>email</span>
                    <input type="email" name="email" {...register('email')} />
                </ErrorLabel>
                <ErrorLabel>
                    <span>password</span>
                    <input type="email" name="email" {...register('password')} />
                </ErrorLabel>
                
                {formError &&
                    <p>{formError}</p>
                }
            </form>
        </main>
    )
}

export default Login