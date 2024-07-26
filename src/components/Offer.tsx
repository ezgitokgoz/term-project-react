"use client"
import Image from 'next/image'
import React from 'react'
import CountDown from './CountDown'
import Link from 'next/link'

const Offer = () => {
  return (
    <div className="bg-black h-screen flex flex-col md:flex-row md:justify-between md:bg-[url('/offerBg.png')] md:h-[70vh] p-6">
      {/*TEXT CONTAINER */}
      <div className="flex-1 flex flex-col justify-center items-center text-center gap-8 p-6">
        <h1 className="text-white text-5xl font-bold xl:text-6xl">King of Flavor Cheese Laden Cheeseburger </h1>
        <p className="text-white xl:text-xl">For a limited time only, don't miss out on our famous Cheese-Laden Cheeseburger, known for its delicious taste and satisfying flavor! Hurry, don't miss out on this opportunity!</p>
        <CountDown/>
        <Link href="http://localhost:3000/product/clwgedt9s000r3uw4mzncw6hi">
          <div className="bg-orange-500 text-white rounded-md py-3 px-6">ORDER NOW</div>
        </Link>
      </div>
      {/*IMAGE CONTAINER */}
      <div className="flex-1 w-full relative md:h-full" >
        <Image src="http://res.cloudinary.com/livanava/image/upload/v1716296026/restaurant/nqhbmwlkuudunqrnxzlt.png" alt="" fill className="object-contain"/>
      </div>
    </div>
  )
}

export default Offer