import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Tools',
  description:
    'Tools and products by AeroQuant Labs — software that solves real problems. See what we are building and get in touch.',
}

export default function ToolsPage() {
  return (
    <section>
      <div className='container mx-auto max-w-3xl px-4'>
        <p className='text-primary font-semibold tracking-wide mb-4 uppercase'>
          What we build
        </p>
        <h1 className='mb-6'>Tools.</h1>
        <p className='text-black/50 text-lg leading-relaxed max-w-2xl mb-12'>
          We build tools and products that help solve real problems in
          society — from web apps to internal tools, software that is
          useful, accessible, and built to last.
        </p>

        <div className='space-y-10 text-lg text-black/70 leading-relaxed'>
          <div>
            <h4 className='mb-3 text-black'>In the works</h4>
            <p>
              Our tools will be listed here as they launch. Nothing is on
              the shelf just yet — we ship often, and this page is where
              they will land first.
            </p>
          </div>

          <div>
            <h4 className='mb-3 text-black'>Have a problem in mind?</h4>
            <p>
              If a tool could solve something for you, we would like to
              hear about it. Tell us what you need, and we will tell you
              honestly whether a tool is the right answer.
            </p>
            <Link
              href='/contact'
              className='inline-block mt-6 bg-primary text-white hover:bg-blue-700 px-6 py-3 rounded-lg'>
              Get in touch
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
