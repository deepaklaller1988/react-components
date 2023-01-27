import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'

function Navbar() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  return (
    <nav className='header'>
      <h1 className='logo'>
        <a href='#'>NextAuth</a>
      </h1>
      <ul className={`main-nav ${!session && loading ? 'loading' : 'loaded'}`}>
        
          <Link href='/'>
            <li>Home</li>
          </Link>
       
          <Link href='/dashboard'>
            <li>Dashboard</li>
          </Link>
        
          <Link href='/blog'>
            <li>Blog</li>
          </Link>

        {!loading && !session && (
          
            <Link href='/api/auth/signin'>
              <li
                onClick={e => {
                  e.preventDefault()
                  signIn('github')
                }}>
                Sign In
              </li>
            </Link>

       )} 
       {session && ( 
          
            <Link href='/api/auth/signout'>
              <li
                onClick={e => {
                  e.preventDefault()
                  signOut()
                }}>
                Sign Out
              </li>
            </Link>
     
        )} 
      </ul>
    </nav>
  )
}

export default Navbar