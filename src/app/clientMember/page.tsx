"use client"
import React from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

interface User {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  role?: string | null | undefined;
  required?:boolean;
}

const page = () => {
  const { data: session,status } = useSession({ required: true })

  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  
  if (!session || !session.user) {
    redirect('/api/auth/signin?callbackUrl=/clientMember')
    return null; // or loading indicator, etc.
  }
  const user: User = session.user;
  return (
    <>
    <div>Client  session</div>
    <p>Email: {user?.email}</p>
    <p>Name: {user?.name}</p>
    <p>Role :{user?.role}</p>

    </>
  )
}

export default page