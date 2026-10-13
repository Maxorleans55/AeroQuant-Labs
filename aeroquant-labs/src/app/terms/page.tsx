import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms & conditions',
  description:
    'The terms that apply when you use the AeroQuant Labs website and when you work with us.',
}

export default function TermsPage() {
  return (
    <section>
      <div className='container mx-auto max-w-3xl px-4'>
        <p className='text-primary font-semibold tracking-wide mb-4 uppercase'>
          Legal
        </p>
        <h1 className='mb-6'>Terms &amp; conditions.</h1>
        <p className='text-black/50 mb-12'>Last updated 12 October 2026</p>

        <div className='space-y-10 text-lg text-black/70 leading-relaxed'>
          <div>
            <h4 className='mb-3 text-black'>Using this website</h4>
            <p>
              This site exists to introduce AeroQuant Labs and our work. You may
              browse it, share links to it, and quote short excerpts with
              credit. You may not attempt to disrupt the site, scrape it at a
              rate that harms it, or present its content as your own.
            </p>
          </div>

          <div>
            <h4 className='mb-3 text-black'>
              Information, not an offer
            </h4>
            <p>
              Everything on this site — services, process, pricing hints,
              timelines — is general information. It is not a binding offer or
              a contract. A project begins only when we and the client agree on
              scope, timeline, price, and ownership in writing, and those
              project-specific terms take precedence over this page.
            </p>
          </div>

          <div>
            <h4 className='mb-3 text-black'>Who owns what</h4>
            <p>
              The content of this website — text, logo, illustrations, and code
              that powers it — belongs to AeroQuant Labs unless a credit says
              otherwise. Software we build for clients belongs to the client, as
              agreed in that project&apos;s terms; we simply ask to describe the
              work publicly unless the client prefers otherwise.
            </p>
          </div>

          <div>
            <h4 className='mb-3 text-black'>External links</h4>
            <p>
              Our news section and footer link to third-party sites (articles,
              social platforms, maps). Those sites run under their own terms and
              privacy policies; we are responsible for our content, not theirs.
            </p>
          </div>

          <div>
            <h4 className='mb-3 text-black'>Liability</h4>
            <p>
              The site is provided as-is. To the extent permitted by law, we are
              not liable for damages arising purely from reliance on this
              website — including out-of-date information or temporary
              downtime — and nothing here limits liability that cannot be
              limited under the laws of the Republic of Ghana.
            </p>
          </div>

          <div>
            <h4 className='mb-3 text-black'>Governing law &amp; contact</h4>
            <p>
              These terms are governed by the laws of the Republic of Ghana.
              Questions, or requests about anything above, go to{' '}
              <a
                href='mailto:AeroQuantLabs55@gmail.com'
                className='text-primary underline'>
                AeroQuantLabs55@gmail.com
              </a>{' '}
              — we reply within two business days. We may update these terms
              occasionally; the date at the top shows the latest revision.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
