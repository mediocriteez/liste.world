import Link from 'next/link'
import css from './index.module.css'
import { classNamesToStr } from '@/utils/index'

const Footer = ({}) => {
    return(
        <footer className={css.root}>
            <div className={classNamesToStr(['midWidth', 'centered'])}>
                <ul>
                    <li>
                        <Link href="/login">log in</Link><br />
                    </li>
                    <li>
                        <Link href="/signup">sign up</Link><br />
                    </li>
                    <li>
                        <Link href="/blog">blog</Link><br />
                    </li>
                    <li>
                        <Link href="/about/preprodterms">Terms of Service and Privacy Policy</Link>
                    </li>
                </ul>
                <h2>Developed by <a href="https://www.flowstate.miami" target="_blank" rel="noreferrer">Flow State Software LLC - Miami, FL</a></h2>
            </div>
        </footer>
    )
}

export default Footer