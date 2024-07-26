import React from 'react'
import Menu from "./Menu";
import Link from 'next/link';
import CartIcon from './CartIcon';
import Image from 'next/image';
import UserLinks from './UserLinks';


const Navbar = () => {
    const user = false;
  return (
    <div className="h-12 text-orange-500 p-4 flex items-center justify-between border-b-2 border-b-orange-600 uppercase md:h-24 lg:px-20 xl:px-40">
        <div className="hidden md:flex gap-4 flex-1">
            <Link href="/">HOME</Link>
            <Link href="/menu">MENU</Link>
            <Link href="/contact">CONTACT</Link>
        </div>
        {/*logo*/}
        <div className="text-[30px] md:font-bold flex-1 md:text-center">
            <Link href="/">PIZZATLAS</Link>
        </div>
        {/*mobile menu*/}
        <div className="md:hidden">
            <Menu/>
        </div>
        <div className="hidden md:flex gap-4 items-center justify-end flex-1">
            <div className="md:absolute top-3 r-2 lg:static flex items-center gap-2 cursor-pointer bg-yellow-300 px-1 rounded-md">
                <Image src="/phone.png" alt="" width={20} height={20}/>
                <span>555 44 00</span>
            </div>
            <CartIcon/>
            <UserLinks/>
            
        </div>
    </div>
  )
}

export default Navbar