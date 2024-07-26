"use client"
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const UserLinks = () => {
  const {status} = useSession()
  return (
    <div>
        {status === "authenticated" ?(
            <div>
                <Link href="/orders">ORDERS</Link>
                <span className="ml-4 cursor-pointer" onClick={()=>signOut()}>LOGOUT</span>
            </div>
            ):(
                <Link href="/login">LOGIN</Link>
            )}
    </div>
  )
}

export default UserLinks