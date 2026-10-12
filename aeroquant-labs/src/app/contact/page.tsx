import type { Metadata } from 'next'
import Contact from '@/app/components/Contact'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with AeroQuant Labs — tell us what you are building and the team will reply within two business days.',
}

const ContactPage = () => {
  return <Contact />
}

export default ContactPage
