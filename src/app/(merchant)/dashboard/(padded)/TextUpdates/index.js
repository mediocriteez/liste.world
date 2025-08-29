"use client"

import Toggle from "@/components/Toggle"
import css from './index.module.css'
import { useCallback, useEffect, useRef, useState } from "react"
import { supabase } from "@/services/supabase/client"
import { useAuthContext } from "@/app/AuthContext"
import Spinner from "@/components/loaders/Spinner"
import { usePageNotifications } from "@/pageNotifications"

const TextUpdates = ({}) => {

    const authContext = useAuthContext()
    const {
        addToStack
    } = usePageNotifications()
    const [initializing, setInitilizing] = useState(true)
    const [toggleError, setToggleError] = useState('')
    const defaultVal = useRef(false)

    const fetchExistingSetting = useCallback(async () => {
        try {
            const {data, error} = await supabase.schema('user_settings').from('launch_text_updates').select('agree').eq('id', authContext.session.user.id)
            if(error) error

            defaultVal.current = data?.[0]?.agree || false
        } catch (error) {
            console.error(error)
            setToggleError(error.message)
        }

        setInitilizing(false)
    }, [authContext])

    useEffect(() => {
        if(!authContext.session) return
        fetchExistingSetting()
    }, [authContext])

    const toggleParentRef = useRef()

    const updateSetting = useCallback(async e => {

        setToggleError('')

        const {
            currentTarget,
            currentTarget: { value }
        } = e
        console.log(currentTarget, value)

        try {
            const {error} = await supabase.schema('user_settings').from('launch_text_updates').upsert({
                id: authContext.session.user.id,
                agree: value,
            })
            
            if(error) throw error

            const notif = {message: 'settings updated'}

            addToStack(notif)

            // setTimeout(() => addToStack(notif), 300)
            // setTimeout(() => addToStack(notif), 500)


        } catch (error) {
            console.error(error)
            setToggleError(error.message)
            toggleParentRef.current.querySelector(`input[value="${value}"]`).checked = false
            toggleParentRef.current.querySelector(`input[value="${!value}"]`).checked = true
            e.preventDefault()
        }
    }, [authContext])

    if(initializing) return <div aria-busy="true" aria-live="polite" role="radiogroup" className={css.root} style={{display: 'grid', placeItems: 'center'}}><Spinner /></div>
    
    return(
        <div aria-busy="false" aria-live="polite" role="radiogroup" className={css.root}>
            <div>
                <p>
                    Do you want to receive text updates about our progress?
                </p>
                <Toggle name="textUpdates" defaultVal={defaultVal.current} ref={toggleParentRef} checked={true} inputProps={{onChange: updateSetting}}/>
            </div>
            {toggleError &&
                <p data-role="error">{toggleError}</p>
            }
        </div>
    )
}

export default TextUpdates