import React from 'react'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { option } from '@/app/api/auth/[...nextauth]/option'

const Nav = async() => {
  // console.log('option',option)
  const session = await getServerSession(option)
  return (
    <div className='flex w-full justify-between px-10 py-4'>
        <h1>Header</h1>
        <div className='flex gap-10'>
            <Link href={'/'}>Home</Link>
            <Link href={'/createUser'}>Create User</Link>
            <Link href={'/clientMember'}>Client Member</Link>
            <Link href={'/member'}>Member</Link>
            {/* <Link href={'/public'}>Client Member</Link> */}
            {
             session ?  (<Link href={'/api/auth/signout?callbackUrl=/'}>Logout</Link> ):
             (<Link href={'/api/auth/signin'}>Login</Link>)
            }
        </div>
    </div>
  )
}

export default Nav