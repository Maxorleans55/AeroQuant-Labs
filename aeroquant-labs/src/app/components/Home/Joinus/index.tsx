'use client'
import React, { useState } from 'react'

const Join = () => {
  // No backend on purpose: the details are handed to the visitor's own
  // email app, ready to send — same handoff as the contact form.
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const subject = `Join us — Website enquiry from ${form.get('name')}`
    const body = [
      `Name: ${form.get('name')}`,
      `Email: ${form.get('email')}`,
      '',
      'I would like to talk about working with AeroQuant Labs.',
    ].join('\n')
    window.location.href = `mailto:AeroQuantLabs55@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <section id='Join' className='overflow-hidden bg-joinus'>
      <div className='container mx-auto max-w-7xl px-4'>
        <div className='text-center'>
          <p className='text-primary text-lg font-normal tracking-widest uppercase'>
            Join us
          </p>
          <h2 className='my-6'>Take your business to the new level.</h2>
          <p className='text-black/50 text-base font-normal max-w-3xl mx-auto'>
            Tell us what you are working on — a product idea, a process that
            needs automating, or a problem worth solving. We will get back to
            you within two business days.
          </p>
        </div>

        <form onSubmit={handleSubmit} className='mx-auto max-w-4xl pt-5'>
          <div className='sm:flex items-center mx-5 p-5 sm:p-0 rounded-xl justify-between bg-grey sm:rounded-full'>
            <div>
              <input
                type='text'
                name='name'
                required
                className='my-4 py-4 sm:pl-6 lg:text-xl text-black sm:rounded-full bg-transparent pl-1 focus:outline-hidden bg-emailbg focus:text-black'
                placeholder='Your name'
                autoComplete='name'
              />
            </div>
            <div>
              <input
                type='email'
                name='email'
                required
                className='my-4 py-4 sm:pl-6 lg:text-xl text-black sm:border-l border-linegrey bg-transparent focus:outline-hidden bg-emailbg focus:text-black'
                placeholder='Your email'
                autoComplete='email'
              />
            </div>
            <div className='sm:mr-3'>
              <button
                type='submit'
                className='w-full sm:w-0 text-xl text-white font-semibold text-center rounded-xl sm:rounded-full bg-primary py-5 px-12 hover:bg-darkmode duration-300'>
                Join!
              </button>
            </div>
          </div>
          {sent && (
            <p className='text-center text-primary font-semibold mt-4 px-4'>
              Your email app should open with the details ready to send. If
              nothing happened, email us at AeroQuantLabs55@gmail.com.
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
export default Join
