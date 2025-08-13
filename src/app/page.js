
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Liste.co coming soon...</h1>
      <h2>Developed by <a href="https://www.flowstate.miami" target="_blank" rel="noreferrer">Flow State Software LLC - Miami, FL</a></h2>
      <Link href="/auth/login">log in</Link><br />
      <Link href="/auth/signup">sign up</Link><br />
      <Link href="/about/preprodterms">Terms of Service and Privacy Policy</Link>
    </main>
  );
}
