'use client'
import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import CommercialVideo from '@/app/components/Common/CommercialVideo'
import { contactmethod } from '@/app/types/contact'

const inputCls =
  'w-full bg-neutral-100 border border-transparent rounded-md px-4 py-3 text-black/80 placeholder:text-black/40 focus:outline-none focus:border-primary focus:bg-white transition'

const Contact = () => {
  const [methods, setMethods] = useState<contactmethod[]>([])
  const [inquiryTypes, setInquiryTypes] = useState<string[]>([])
  const [heardAboutOptions, setHeardAboutOptions] = useState<string[]>([])
  const [countries, setCountries] = useState<string[]>([])
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/data')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setMethods(data.ContactMethodsData)
        setInquiryTypes(data.InquiryTypes)
        setHeardAboutOptions(data.HeardAboutOptions)
        setCountries(data.CountryOptions)
      } catch (error) {
        console.error('Error fetching contact data:', error)
      }
    }
    fetchData()
  }, [])

  // No backend on purpose: the form hands the message to the visitor's own
  // email app, ready to send — nothing is silently thrown away.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const subject = `[${form.get('inquiryType')}] Website enquiry from ${form.get(
      'firstName'
    )} ${form.get('lastName')}`
    const body = [
      `Name: ${form.get('firstName')} ${form.get('lastName')}`,
      `Email: ${form.get('email')}`,
      `Company: ${form.get('company') || '—'}`,
      `Country: ${form.get('country')}`,
      `Inquiry type: ${form.get('inquiryType')}`,
      `Heard about us: ${form.get('heardAbout') || '—'}`,
      `Newsletter: ${form.get('updates') ? 'Yes' : 'No'}`,
      '',
      String(form.get('message')),
    ].join('\n')
    window.location.href = `mailto:AeroQuantLabs55@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <>
      {/* HERO */}
      <section
        className='relative overflow-hidden'
        style={{
          background:
            'radial-gradient(110% 110% at 12% 8%, #2b93ff 0%, #0066ff 38%, #0047c2 68%, #00225f 100%)',
        }}>
        <div className='container mx-auto max-w-7xl px-4 pt-36 pb-20 lg:pt-48 lg:pb-28'>
          <p
            className='text-white/70 font-semibold tracking-wide mb-4'
            data-aos='fade-up'>
            Contact Us
          </p>
          <h1
            className='text-white text-4xl sm:text-5xl lg:text-6xl font-extrabold max-w-3xl leading-tight'
            data-aos='fade-up'
            data-aos-delay='100'>
            Let&rsquo;s talk about what you&rsquo;re building.
          </h1>
          <p
            className='text-white/80 text-lg mt-8 max-w-2xl'
            data-aos='fade-up'
            data-aos-delay='200'>
            No ticket queues and no call centres — your message reaches the
            AeroQuant Labs team directly.
          </p>
        </div>
      </section>

      {/* HOW TO CONTACT US */}
      <section className='py-20 lg:py-28'>
        <div className='container mx-auto max-w-7xl px-4'>
          <p
            className='text-primary font-semibold tracking-wide mb-4'
            data-aos='fade-up'>
            How to Contact Us
          </p>
          <h2 className='max-w-3xl' data-aos='fade-up'>
            Based in Accra, available everywhere.
          </h2>
          <p
            className='text-black/50 mt-6 max-w-2xl'
            data-aos='fade-up'>
            Great work starts with a real conversation. Here is how to reach
            the team.
          </p>
          <div className='grid sm:grid-cols-2 gap-x-16 gap-y-10 mt-14'>
            {methods.map((method) => (
              <div
                key={method.title}
                className='flex gap-4'
                data-aos='fade-up'>
                <Icon
                  icon='tabler:arrow-right'
                  className='text-primary text-2xl shrink-0 mt-1'
                />
                <div>
                  <h3 className='text-xl font-bold mb-2'>{method.title}</h3>
                  {method.href ? (
                    <a
                      href={method.href}
                      className='text-black/50 hover:text-primary transition'>
                      {method.detail}
                    </a>
                  ) : (
                    <p className='text-black/50'>{method.detail}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAP */}
      <section data-aos='fade-up'>
        <iframe
          title='Map showing Accra, Ghana — where AeroQuant Labs is based'
          src='https://www.openstreetmap.org/export/embed.html?bbox=-0.32%2C5.53%2C-0.06%2C5.68&layer=mapnik&marker=5.6037%2C-0.1870'
          className='w-full h-[380px] lg:h-[480px] border-0 block'
          loading='lazy'
        />
      </section>

      {/* SEE WHAT WE DO */}
      <section className='bg-black text-white py-20 lg:py-28'>
        <div className='container mx-auto max-w-7xl px-4'>
          <h2 data-aos='fade-up'>See what we do.</h2>
          <p className='text-white/50 mt-6 max-w-2xl' data-aos='fade-up'>
            A ten-second tour of the work we love doing.
          </p>
          <div className='mt-14' data-aos='fade-up'>
            <CommercialVideo
              src='/videos/contact-commercial.mp4'
              poster='/videos/contact-poster.jpg'
              label='A ten-second tour of AeroQuant Labs'
            />
          </div>
        </div>
      </section>

      {/* LET'S CONNECT */}
      <section className='py-20 lg:py-28'>
        <div className='container mx-auto max-w-7xl px-4 grid lg:grid-cols-2 gap-16 items-start'>
          <div data-aos='fade-up'>
            <p className='text-primary font-semibold tracking-wide mb-4'>
              Do You Have Questions?
            </p>
            <h2>Let&rsquo;s Connect.</h2>
            <p className='text-black/50 mt-6 max-w-md'>
              Do you have a project in mind, a partnership idea, or just a
              question? Leave us a message — we&rsquo;d be happy to connect.
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className='space-y-5'
            data-aos='fade-up'
            data-aos-delay='100'>
            <div className='grid sm:grid-cols-2 gap-5'>
              <input
                required
                name='firstName'
                placeholder='First Name *'
                className={inputCls}
              />
              <input
                required
                name='lastName'
                placeholder='Last Name *'
                className={inputCls}
              />
            </div>
            <input
              required
              type='email'
              name='email'
              placeholder='Email *'
              className={inputCls}
            />
            <select required name='inquiryType' defaultValue='' className={inputCls}>
              <option value='' disabled>
                Inquiry Type *
              </option>
              {inquiryTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <input
              name='company'
              placeholder='Company'
              className={inputCls}
            />
            <select required name='country' defaultValue='' className={inputCls}>
              <option value='' disabled>
                Country *
              </option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            <textarea
              required
              name='message'
              rows={5}
              placeholder='Message *'
              className={inputCls}
            />
            <fieldset>
              <legend className='font-semibold mb-3'>
                How did you hear about us?
              </legend>
              <div className='flex flex-wrap gap-3'>
                {heardAboutOptions.map((option) => (
                  <label key={option} className='cursor-pointer'>
                    <input
                      type='radio'
                      name='heardAbout'
                      value={option}
                      className='peer sr-only'
                    />
                    <span className='inline-block border border-black/15 rounded-full px-4 py-2 text-sm text-black/60 peer-checked:border-primary peer-checked:bg-primary peer-checked:text-white transition'>
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
            <label className='flex items-start gap-3 text-sm text-black/60'>
              <input
                type='checkbox'
                name='updates'
                className='mt-1 accent-primary'
              />
              Email me AeroQuant Labs news and launches.
            </label>
            <button
              type='submit'
              className='bg-primary text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold hover:cursor-pointer transition'>
              Contact Us
            </button>
            {sent && (
              <p className='text-sm text-green-600'>
                Your email app should be opening with your message ready to
                send. If nothing happened, email us directly at{' '}
                <a href='mailto:AeroQuantLabs55@gmail.com' className='underline'>
                  AeroQuantLabs55@gmail.com
                </a>
                .
              </p>
            )}
            <p className='text-xs text-black/40'>
              By submitting this form you agree to be contacted about your
              enquiry. We never share your details.
            </p>
          </form>
        </div>
      </section>
    </>
  )
}

export default Contact
