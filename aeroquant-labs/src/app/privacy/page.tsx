import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy policy',
  description:
    'How AeroQuant Labs handles your information on this website and in our inbox.',
}

export default function PrivacyPage() {
  return (
    <section>
      <div className='container mx-auto max-w-3xl px-4'>
        <p className='text-primary font-semibold tracking-wide mb-4 uppercase'>
          Legal
        </p>
        <h1 className='mb-6'>Privacy policy.</h1>
        <p className='text-black/50 mb-12'>Last updated 12 October 2026</p>

        <div className='space-y-10 text-lg text-black/70 leading-relaxed'>
          <div>
            <h4 className='mb-3 text-black'>The short version</h4>
            <p>
              We do not run ads, trackers, or analytics on this website, and we
              do not collect personal data through it. When you contact us, the
              message is handed to your own email app and sent by you — there is
              no hidden form database on our side.
            </p>
          </div>

          <div>
            <h4 className='mb-3 text-black'>What reaches us, and why</h4>
            <p>
              Emails you choose to send us (through the contact form, the Join
              us form, or directly) arrive in our inbox. We use what you send
              only to reply, to prepare proposals, and to carry out work you
              have asked us for. We keep correspondence for as long as it is
              useful for that relationship, and you can ask us to delete it at
              any time.
            </p>
          </div>

          <div>
            <h4 className='mb-3 text-black'>What this site loads</h4>
            <p>
              The site serves its own images and videos and shows a public map
              from OpenStreetMap. The news section reads publicly published
              technology headlines when the page is opened. None of this is tied
              to you personally, and we set no cookies of our own — your host
              may keep standard technical logs (IP address, time, page) for
              security and abuse prevention.
            </p>
          </div>

          <div>
            <h4 className='mb-3 text-black'>Sharing</h4>
            <p>
              We do not sell or share your details with advertisers or data
              brokers. If a project requires a tool or service (for example,
              code hosting or a payment provider), we will tell you what is
              involved before anything sensitive is shared.
            </p>
          </div>

          <div>
            <h4 className='mb-3 text-black'>Your choices</h4>
            <p>
              You can ask what we hold about you, ask us to correct or delete
              it, or opt out of any non-essential contact at any time. Email{' '}
              <a
                href='mailto:AeroQuantLabs55@gmail.com'
                className='text-primary underline'>
                AeroQuantLabs55@gmail.com
              </a>{' '}
              and we will respond within two business days.
            </p>
          </div>

          <div>
            <h4 className='mb-3 text-black'>Questions</h4>
            <p>
              AeroQuant Labs is a software team based in Accra, Ghana. If
              anything here is unclear, write to us at{' '}
              <a
                href='mailto:AeroQuantLabs55@gmail.com'
                className='text-primary underline'>
                AeroQuantLabs55@gmail.com
              </a>
              . If this policy changes, the updated date above changes with it.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
