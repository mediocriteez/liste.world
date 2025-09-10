import { classNamesToStr } from '@/utils/index';
import css from './page.module.css'
import formCSS from '@/styles/form.module.css'
import Link from "next/link";
import BlogFeature from './BlogFeature';

export default function Home() {
  return (
    <main className={css.main}>
      <div className={classNamesToStr(['midWidth', 'centered', css.contentContainer])}>
        <article className={classNamesToStr([css.signUpNow, 'onWhiteShadow'])}>
          <h2>Liste is currently open for pre-production sign up</h2>
          <p>Earn <span>3 Months</span> of free Listeing by signing up early!</p>
          <Link href="/signup" className={classNamesToStr([formCSS.submit, css.signUpNowButton])} style={{width: 'auto', fontSize: '1.25em'}}>Sign Up Now</Link>
        </article>
        <section className={css.hero}>
          <h1>Simply Selling</h1>
          <h2>Build and publish an online store you&apos;re proud of in hours not days</h2>
          <p>Liste takes stress out of the equation, let&apos;s you create the pages you want, and handles all the rest.</p>
        </section>
        <section className={css.blogFeature}>
          <h2>Stay up to date on our build progress</h2>
          <BlogFeature />
        </section>
      </div>
    </main>
  );
}
