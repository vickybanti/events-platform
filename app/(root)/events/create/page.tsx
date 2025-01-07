import EventForm from '@/components/shared/EventForm'
import { auth } from '@clerk/nextjs/server'
import React from 'react'

const CreateEvent = () => {
    const {sessionClaims} = auth()

    const userId = sessionClaims?.userId as string
  return (
    <>
    <section className='flex flex-col bg-primary-100 bg-dotted-pattern bg-cover bg-center lg:px-[150px] md:px-4 sm:px-4 py-5 md:py-10'>
    <h3 className='wrapper h3-bold text-center sm:text-left'>Create Event</h3>

    <div className='wrapper my-8'>
        <EventForm userId={userId} type="Create"/>
    </div>

    </section>
    </>
  )
}

export default CreateEvent