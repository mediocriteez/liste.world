import { classNamesToStr } from '@/utils/index';
import css from './page.module.css'
import Link from "next/link";

export default function Home() {
  return (
    <main className={css.main}>
      <div className={classNamesToStr(['midWidth', 'centered', css.contentContainer])}>
        <h1>Simply Selling</h1>
        <h2>Build and publish an online store you&apos;re proud of in hours not days</h2>
        <p>Liste takes stress out of the equation, let&apos;s you create the pages you want, and handles all the rest!</p>
        <h2>Developed by <a href="https://www.flowstate.miami" target="_blank" rel="noreferrer">Flow State Software LLC - Miami, FL</a></h2>
        <Link href="/login">log in</Link><br />
        <Link href="/signup">sign up</Link><br />
        <Link href="/blog">blog</Link><br />
        <Link href="/about/preprodterms">Terms of Service and Privacy Policy</Link>
      </div>
    </main>
  );
}
