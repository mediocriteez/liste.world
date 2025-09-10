import Link from 'next/link'
import css from './index.module.css'
import { classNamesToStr } from '@/utils/index'
import Nav from './Nav'

const Header = ({}) => {
    return(
        <header className={css.root}>
            <div className={classNamesToStr(['midWidth', 'centered', css.contentContainer])}>
                <Link href="/" className={css.brandName}>Liste<img src="/images/logo_clean.svg" alt="logo"/></Link>
            </div>
            <Nav />
        </header>
    )
}

export default Header