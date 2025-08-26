"use client"

import { supabase } from "@/services/supabase/client"

const MerchantDashboard = ({}) => {
    return(
        <main>
            <h1>Liste<img src="/images/logo.svg" /></h1>
            <button onClick={() => supabase.auth.signOut()}>log out</button>
        </main>
    )
}

export default MerchantDashboard