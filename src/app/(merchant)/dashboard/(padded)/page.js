"use client"

import { supabase } from "@/services/supabase/client"
import css from './page.module.css'
import { classNamesToStr } from "@/utils/index"
import ErrorLabel from "@/components/ErrorLabel"
import Toggle from "@/components/Toggle"
import TextUpdates from "./TextUpdates"
import Spinner from "@/components/loaders/Spinner"

const MerchantDashboard = ({}) => {
    return(
        <div className={classNamesToStr(['channelWidth', 'centered'])} style={{overflow: 'hidden'}}>
            <div className={css.nav}>
                <h1 style={{fontFamily: 'kanit', color: 'var(--dark-shade-col)'}}>Liste<img src="/images/logo_clean.svg" style={{marginLeft: '2px', height: '.45lh', verticalAlign: 'middle'}}/></h1>
                <button onClick={() => supabase.auth.signOut()}>log out</button>
            </div>
            <article className={css.introText}>
                <h2>
                    <span data-role="title"><img src="/images/logo_clean.svg" />Congrats!<img src="/images/logo_clean.svg" /></span> 
                    <span data-role="body">By signing up early you&apos;ve eaned 3 free months of Listeing!</span>
                </h2>
                <TextUpdates />
            </article>
            {/* <button onClick={() => supabase.auth.signOut()}>log out</button> */}
        </div>
    )
}

export default MerchantDashboard