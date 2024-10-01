import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import Image from 'next/image'
import NavItems from './NavItems'
  

const MobileNav = () => {
  return (
    <nav className='md:hidden'>

<Sheet>
  <SheetTrigger className='align-middle'>
    <Image src="assets/icons/menu.svg"
    alt="menu"
    width={24}
    height={24}
    className='cursor-pointer'/>
  </SheetTrigger>
  <SheetContent className='bg-white'>
    <SheetHeader>
      <SheetTitle>
        <Image src="assets/images/logo.svg"
        alt='logo'
        width={86}
        height={86}
        />
      </SheetTitle>
      <SheetDescription>
        <NavItems />
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>


    </nav>
  )
}

export default MobileNav