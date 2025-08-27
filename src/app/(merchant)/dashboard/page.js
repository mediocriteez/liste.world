"use client"

import { supabase } from "@/services/supabase/client"
import css from './page.module.css'
import { classNamesToStr } from "@/utils/index"
import ErrorLabel from "@/components/ErrorLabel"
import Toggle from "@/components/Toggle"

const MerchantDashboard = ({}) => {
    return(
        <div className={classNamesToStr(['channelWidth', 'centered'])}>
            <article className={css.introText}>
                <h1>Liste<img src="/images/logo_clean.svg" style={{marginLeft: '2px', height: '.5lh', verticalAlign: 'middle'}}/></h1>
                <p>
                    Congrats! By signing up early you&apos;ve eaned 3 free months of Listeing!
                </p>
            </article>
            <button onClick={() => supabase.auth.signOut()}>log out</button>
        </div>
    )
}

export default MerchantDashboard