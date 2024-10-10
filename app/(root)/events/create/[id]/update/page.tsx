import EventForm from '@/components/shared/EventForm'
import { auth } from '@clerk/nextjs/server'
import React from 'react'

const UpdateEvent = () => {
    const {sessionClaims} = auth()

    const userId = sessionClaims?.userId as string
    console.log(userId)
  return (
    <>
    <section className='flex flex-center bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
    <h3 className='wrapper h3-bold text-center sm:text-left'></h3>

    <div className='wrapper my-8'>
        <EventForm userId={userId} type="Update"/>
    </div>

    </section>
    </>
  )
}

export default UpdateEvent