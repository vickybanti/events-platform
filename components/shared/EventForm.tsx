"use client"
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Textarea } from "@/components/ui/textarea"
import DatePicker from "react-datepicker";
import {useUploadThing} from '@/lib/uploadthing'

import "react-datepicker/dist/react-datepicker.css";


import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { eventFormSchema } from '@/lib/validator'
import { eventDefaultValues } from '@/constants'
import Dropdown from './Dropdown'
import FileUploader from './FileUploader'
import Image from 'next/image'
import { Checkbox } from '../ui/checkbox'
import CreateEvent from '@/app/(root)/events/create/page'
import path from 'path'
import {useRouter } from 'next/navigation'
import { createEvent } from '@/lib/actions/events.actions'




type EventFormProps = {
    userId: string ;
    type:"Create" | "Update"
}

const EventForm = ({userId, type}:EventFormProps) => {
    const router = useRouter()
    const [startDate, setStartDate] = useState(new Date());

    const [files, setFiles] = useState<File[]>([])

    const initialValues = eventDefaultValues;

    const  {startUpload} = useUploadThing("imageUploader")

    const form = useForm<z.infer<typeof eventFormSchema>>({
        resolver: zodResolver(eventFormSchema),
        defaultValues: initialValues
        
      })
     
      // 2. Define a submit handler.
      async function onSubmit(values: z.infer<typeof eventFormSchema>) {
        const eventData = values;

let uploadedImageUrl = values.imageUrl;

if (files.length > 0) {
  const uploadedImages = await startUpload(files);

  if(!uploadedImages) {
    return;
  }
  uploadedImageUrl = uploadedImages[0].url

  // If startUpload returns an array of numbers, map them to objects with URLs
  
  // Ensure uploadedImageObjects is valid
  
  // Ensure uploadedImageUrl is valid before proceeding
  


console.log("Uploaded Image URL:", uploadedImageUrl);
       }
        if(type === "Create"){
            try {
                const newEvent = await createEvent({
                    event: {...values, imageUrl:uploadedImageUrl},
                    userId,
                    path:'/profile'
                })

                if(newEvent){
                    form.reset()
                    router.push(`/events/${newEvent._id}`)
                }
            } catch (error) {
                console.log(error)
            }
        }
        console.log(values)
      }
  return (
    <>
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
            {/* Event Title */}
            <div className='flex flex-col gap-5 md:flex-row'>
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <FormLabel>Event Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Event title" {...field} className='input-field' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Category */}
                <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                                <Dropdown onChangeHandler={field.onChange} value={field.value} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            {/* Description and Image */}
            <div className='flex flex-col gap-5 md:flex-row'>
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <FormControl className='h-72'>
                                <Textarea placeholder="Description" {...field} className='textarea rounded-2xl' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <FormControl className='h-72'>
                                <FileUploader 
                                    onFieldChange={field.onChange}
                                    imageUrl={field.value}
                                    setFiles={setFiles}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <div className='flex flex-col gap-5 md:flex-row'>
                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <FormControl>
                                {/* Wrapping Image and Input inside a div to avoid React.Children.only error */}
                                <div className='flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50'>
                                    <div>
                                        <Image src="/assets/icons/location-grey.svg" width={24} height={24} alt="location" />
                                    </div>
                                    <Input placeholder="Event location or online" {...field} className='input-field' />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            {/* Start date */}
            <div className='flex flex-col gap-5 md:flex-row'>
                <FormField
                    control={form.control}
                    name="startDateTime"
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <FormControl>
                                {/* Wrapping Image and Input inside a div to avoid React.Children.only error */}
                                <div className='flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50'>
                                    <div>
                                        <Image src="/assets/icons/calendar.svg" width={24} height={24} alt="calendar" className='filter-grey'/>
                                        </div>
                                   <p className='ml-3 whitespace-nowrap text-gray-500'>Start Date: </p>
                                   <DatePicker 
                                   selected={field.value} 
                                   onChange={(date) => field.onChange(date)}                                    showTimeSelect
                                   timeInputLabel='Time:'
                                   dateFormat="MM/dd/yyyy h:mm aa"
                                   wrapperClassName="datePicker"
                                   />
                                    
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

              {/* Start date */}
                <FormField
                    control={form.control}
                    name="endDateTime"
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <FormControl>
                                {/* Wrapping Image and Input inside a div to avoid React.Children.only error */}
                                <div className='flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50'>
                                    <div>
                                        <Image src="/assets/icons/calendar.svg" width={24} height={24} alt="calendar" className='filter-grey'/>
                                        </div>
                                   <p className='ml-3 whitespace-nowrap text-gray-500'>End Date: </p>
                                   <DatePicker 
                                   selected={field.value} 
                                   onChange={(date) => field.onChange(date)}                                    showTimeSelect
                                   timeInputLabel='Time:'
                                   dateFormat="MM/dd/yyyy h:mm aa"
                                   wrapperClassName="datePicker"
                                   />
                                    
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <div className='flex flex-col gap-5 md:flex-row'>

                  {/* Price */}
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <FormControl>
                                {/* Wrapping Image and Input inside a div to avoid React.Children.only error */}
                                <div className='flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50'>
                                    <div>
                                        <Image src="/assets/icons/dollar.svg" width={24} height={24} alt="dollar" className='filter-grey'/>
                                        </div>
                                   <p className='ml-3 whitespace-nowrap text-gray-500'>Price: </p>
                                   <Input type="number" placeholder='Price' {...field} 
                                   className='p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0
                                   focus-visible:ring-offset-0'/>
                                    
                                    <FormField
                    control={form.control}
                    name="isFree"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                {/* Wrapping Image and Input inside a div to avoid React.Children.only error */}
                                <div className='flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50'>
                                    <label htmlFor='isFree' className='whitespace-nowrap pr-3 leading-none
                                    peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>Free ticket</label>
                                   <Checkbox id="isFree" className="mr-2 h-5 w-5 border-2 border-primary-500"
                                   onCheckedChange={field.onChange}
                                   checked={field.value}
                                   />
                                    
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                                </div>
                            </FormControl>
                            
                            <FormMessage />
                        </FormItem>
                    )}
                />


<FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                        <FormItem className='w-full'>
                            <FormControl>
                                {/* Wrapping Image and Input inside a div to avoid React.Children.only error */}
                                <div className='flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50'>
                                    <div>
                                        <Image src="/assets/icons/link.svg" width={24} height={24} alt="location" />
                                    </div>
                                    <Input placeholder="URL" {...field} className='input-field' />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />


            </div>


            <Button type="submit"
            size="lg"
            disabled={form.formState.isSubmitting}
            className='button col-span-2 w-full'>
                {form.formState.isSubmitting ? (
                    'Submitting...'
                ): `${type} Event`}
            </Button>
        </form>
    </Form>
</>
  )
}

export default EventForm