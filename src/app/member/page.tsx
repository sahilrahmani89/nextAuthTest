import { getServerSession } from 'next-auth'
import React from 'react'
import { option } from '../api/auth/[...nextauth]/option'
import { redirect } from 'next/navigation'


const Page = async() => {
  const session = await getServerSession(option)

  if(!session){
    redirect('/api/auth/signin?callbackUrl=/member')
  }

  return (
    <>
    <div>Member Server session</div>
    <p>Email: {session?.user?.email}</p>
    <p>Name: {session?.user?.name}</p>
    <p>Role :{session?.user?.role}</p>

    </>
  )
}

export default Page