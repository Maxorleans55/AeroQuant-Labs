import { NextResponse } from 'next/server'

import { HeaderItem } from '@/app/types/menu'
import { aboutdata } from '@/app/types/aboutdata'
import { workdata } from '@/app/types/workdata'
import { featureddata } from '@/app/types/featureddata'
import { articles } from '@/app/types/articles'
import { footerlinks } from '@/app/types/footerlinks'
import { engagement } from '@/app/types/engagement'
import { contactmethod } from '@/app/types/contact'
import { whywork } from '@/app/types/whywork'

// header nav-links data
const headerData: HeaderItem[] = [
  { label: 'About Us', href: '/#About' },
  { label: 'Team', href: '/#Team' },
  { label: 'FAQ', href: '/#FAQ' },
  { label: 'Blog', href: '/#Blog' },
]

// about data
const Aboutdata: aboutdata[] = [
  {
    heading: 'About us.',
    imgSrc: '/images/aboutus/imgOne.svg',
    paragraph:
      'We are a team of young software developers who build tools and products that help solve problems in society.',
    link: 'Learn more',
  },
  {
    heading: 'Services.',
    imgSrc: '/images/aboutus/imgTwo.svg',
    paragraph:
      'From web apps to internal tools, we design and ship software that is useful, accessible, and built to last.',
    link: 'Learn more',
  },
  {
    heading: 'Our Works.',
    imgSrc: '/images/aboutus/imgThree.svg',
    paragraph:
      'We take ideas from problem to production — researching, designing, building, and iterating alongside the people who use what we make.',
    link: 'Learn more',
  },
]

// work-data
const WorkData: workdata[] = [
  {
    profession: 'Co-founder',
    name: 'Maxwell Otsiwa Agyakwa',
    imgSrc: '/images/wework/maxwell.jpg',
  },
  {
    profession: 'Co-founder',
    name: 'Bright Otsiwa Agyei',
    imgSrc: '/images/wework/bright.jpg',
  },
  {
    profession: 'Co-founder',
    name: 'Elorm Kuami Loh',
  },
]

// featured data
const FeaturedData: featureddata[] = [
  {
    heading: 'Field data collection app for NGOs.',
    imgSrc: '/images/featured/feat1.jpg',
  },
  {
    heading: 'Scheduling tool for a local clinic.',
    imgSrc: '/images/featured/feat2.jpg',
  },
  {
    heading: 'Inventory dashboard for small retail.',
    imgSrc: '/images/featured/feat1.jpg',
  },
  {
    heading: 'Campus resources platform for students.',
    imgSrc: '/images/featured/feat2.jpg',
  },
]

// engagement data — how clients work with AeroQuant Labs
const EngagementData: engagement[] = [
  {
    heading: 'Discovery Sprint',
    duration: '1–2 weeks',
    label: 'fixed price',
    features: [
      'Workshop to pin down the problem',
      'User flows and key screens',
      'Technical approach and estimate',
      'You keep the deliverables',
      'Credited toward the build',
    ],
  },
  {
    heading: 'Product Build',
    duration: '4–12 weeks',
    label: 'fixed scope',
    features: [
      'Design and engineering in one team',
      'Weekly demos, no black box',
      'Tested, documented code',
      'Launch and handover support',
      'Source code is yours',
    ],
  },
  {
    heading: 'Ongoing Partner',
    duration: 'monthly',
    label: 'rolling',
    features: [
      'A team that already knows your product',
      'Continuous improvements and fixes',
      'Monitoring and maintenance',
      'Priority response times',
      'Scale up or down monthly',
    ],
  },
]

// why work with us — honest differentiators, no invented customers
const WhyWorkData: whywork[] = [
  {
    icon: 'tabler:users-group',
    title: 'Founders do the work',
    description:
      'You deal with the people actually building your product — not a sales layer handing you off to someone you never met.',
  },
  {
    icon: 'tabler:rocket',
    title: 'We ship, fast',
    description:
      'Small scope, working software, quick iterations. You see real progress in days, not a slide deck in six weeks.',
  },
  {
    icon: 'tabler:lock-open',
    title: 'No lock-in',
    description:
      'Clean, documented code that is yours from day one. Hire us or hire someone else — the work walks with you.',
  },
  {
    icon: 'tabler:device-mobile',
    title: 'Built for real conditions',
    description:
      'Cheap phones, slow networks, low data. We design for the connection your users actually have, not the one we wish they had.',
  },
]

// artical data
const ArticlesData: articles[] = [
  {
    time: '5 min',
    heading: 'Start with the problem,',
    heading2: 'not the technology.',
    name: 'AeroQuant Labs',
    date: 'march 4, 2026',
    imgSrc: '/images/articles/article.png',
  },
  {
    time: '6 min',
    heading: 'What we learned building',
    heading2: 'for slow networks.',
    name: 'AeroQuant Labs',
    date: 'february 18, 2026',
    imgSrc: '/images/articles/article2.png',
  },
  {
    time: '4 min',
    heading: 'Shipping weekly:',
    heading2: 'how we keep momentum.',
    name: 'AeroQuant Labs',
    date: 'january 27, 2026',
    imgSrc: '/images/articles/article3.png',
  },
  {
    time: '7 min',
    heading: 'Designing tools people',
    heading2: 'actually keep using.',
    name: 'AeroQuant Labs',
    date: 'december 12, 2025',
    imgSrc: '/images/articles/article.png',
  },
  {
    time: '5 min',
    heading: 'Why we write tests',
    heading2: 'before we write features.',
    name: 'AeroQuant Labs',
    date: 'november 6, 2025',
    imgSrc: '/images/articles/article2.png',
  },
  {
    time: '6 min',
    heading: 'From student projects',
    heading2: 'to products in the wild.',
    name: 'AeroQuant Labs',
    date: 'october 15, 2025',
    imgSrc: '/images/articles/article3.png',
  },
]

// footer links data
const FooterLinksData: footerlinks[] = [
  {
    section: 'Menu',
    links: [
      { label: 'About Us', href: '/#About' },
      { label: 'Team', href: '/#Team' },
      { label: 'FAQ', href: '/#FAQ' },
      { label: 'Blog', href: '/#Blog' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    section: 'Category',
    links: [
      { label: 'Design', href: '/' },
      { label: 'Mockup', href: '/' },
      { label: 'View all', href: '/' },
    ],
  },
  {
    section: 'Pages',
    links: [
      { label: '404', href: '/' },
      { label: 'Instructions', href: '/' },
      { label: 'License', href: '/' },
    ],
  },
  {
    section: 'Others',
    links: [
      { label: 'Styleguide', href: '/' },
      { label: 'Changelog', href: '/' },
    ],
  },
]

// contact page data
const ContactMethodsData: contactmethod[] = [
  {
    title: 'Email Us',
    detail: 'AeroQuantLabs55@gmail.com',
    href: 'mailto:AeroQuantLabs55@gmail.com',
  },
  {
    title: 'Our Location',
    detail: 'Accra, Ghana — remote-first, meetings by appointment.',
  },
  {
    title: 'Response Time',
    detail: 'We reply to every message within two business days.',
  },
  {
    title: 'More To Come',
    detail: 'As AeroQuant Labs grows, so will our presence.',
  },
]

const InquiryTypes = [
  'Project idea',
  'Partnership',
  'Join the team',
  'Other',
]

const HeardAboutOptions = [
  'Search Engine',
  'Social Media',
  'Event',
  'Referral',
  'Other',
]

const CountryOptions = [
  'Ghana',
  'Nigeria',
  'Kenya',
  'South Africa',
  'United Kingdom',
  'United States',
  'Germany',
  'Canada',
  'Other',
]

export const GET = () => {
  return NextResponse.json({
    headerData,
    Aboutdata,
    WorkData,
    FeaturedData,
    EngagementData,
    WhyWorkData,
    ArticlesData,
    FooterLinksData,
    ContactMethodsData,
    InquiryTypes,
    HeardAboutOptions,
    CountryOptions,
  })
}
