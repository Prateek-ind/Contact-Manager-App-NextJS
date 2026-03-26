export const dynamic = "force-dynamic"
import Link from 'next/link'
import LogoutButton from './LogoutButton'
import { getSessionCookie } from '../_lib/session';

const Navbar = async () => {
    const session = await getSessionCookie();
    console.log(session)
  return (
    <nav className='bg-white shadow-sm'>
        <div className='container mx-auto p-4 flex justify-between items-center'>
            <Link href="/" className='text-xl font-bold text-gray-600 hover:text-gray-800'>
                Contact Manager
            </Link>
            <div className='flex items-center space-x-4'>
                {session ? (
                    <>
                    <Link href={"/contacts"} className='hover:text-gray-800 mr-8'>
                        Contacts
                    </Link>
                    <LogoutButton/>
                    </>
                ): (
                    <>
                    <Link href={'/login'} className='hover:text-gray-800'>
                        Login
                    </Link>
                    <Link href={'/register'} className='hover:text-gray-800'>
                        Register
                    </Link>
                    </>
                )}
            </div>
        </div>
    </nav>
  )
}

export default Navbar