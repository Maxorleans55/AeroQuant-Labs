import { NextResponse } from 'next/server'

import { HeaderItem } from '@/app/types/menu'
import { aboutdata } from '@/app/types/aboutdata'
import { workdata } from '@/app/types/workdata'
import { featureddata } from '@/app/types/featureddata'
import { testimonials } from '@/app/types/testimonials'
import { articles } from '@/app/types/articles'
import { footerlinks } from '@/app/types/footerlinks'

// header nav-links data
const headerData: HeaderItem[] = [
  { label: 'About Us', href: '#About' },
  { label: 'Team', href: '#Team' },
  { label: 'FAQ', href: '#FAQ' },
  { label: 'Blog', href: '#Blog' },
  { label: 'Docs', href: '/documentation' },
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

// plans data
const PlansData = [
  {
    heading: 'Startup',
    price: {
      monthly: 19,
      yearly: 190,
    },
    user: 'per user',
    features: {
      profiles: '5 Social Profiles',
      posts: '5 Scheduled Posts Per Profile',
      templates: '400+ Templated',
      view: 'Calendar View',
      support: '24/7 Support',
    },
  },
  {
    heading: 'Business',
    price: {
      monthly: 29,
      yearly: 290,
    },
    user: 'per user',
    features: {
      profiles: '10 Social Profiles',
      posts: '5 Scheduled Posts Per Profile',
      templates: '600+ Templated',
      view: 'Calendar View',
      support: '24/7 VIP Support',
    },
  },
  {
    heading: 'Agency',
    price: {
      monthly: 59,
      yearly: 590,
    },
    user: 'per user',
    features: {
      profiles: '100 Social Profiles',
      posts: '100 Scheduled Posts Per Profile',
      templates: '800+ Templated',
      view: 'Calendar View',
      support: '24/7 VIP Support',
    },
  },
]

// testimonial data
const TestimonialsData: testimonials[] = [
  {
    name: 'Robert Fox',
    profession: 'Operations Lead, Parkview Int.Ltd',
    comment:
      'They took a vague idea and shipped a working product in weeks. Communication was clear at every step, and nothing was oversold.',
    imgSrc: '/images/testimonial/user1.svg',
    rating: 5,
  },
  {
    name: 'Leslie Alexander',
    profession: 'Founder, Parkview Int.Ltd',
    comment:
      'The tool they built replaced three spreadsheets and a lot of manual work for our team. It just works, every day.',
    imgSrc: '/images/testimonial/user2.svg',
    rating: 5,
  },
  {
    name: 'Cody Fisher',
    profession: 'Product Manager, Parkview Int.Ltd',
    comment:
      'Fast, honest, and genuinely invested in the outcome. They pushed back when something was a bad idea — exactly what you want in a partner.',
    imgSrc: '/images/testimonial/user3.svg',
    rating: 4,
  },
  {
    name: 'Robert Fox',
    profession: 'Operations Lead, Parkview Int.Ltd',
    comment:
      'We needed something our users could run on cheap phones and slow connections. They understood that constraint from day one.',
    imgSrc: '/images/testimonial/user1.svg',
    rating: 5,
  },
  {
    name: 'Leslie Alexander',
    profession: 'Founder, Parkview Int.Ltd',
    comment:
      'From the first call to launch, we always knew what was being built, what it cost, and what was next.',
    imgSrc: '/images/testimonial/user2.svg',
    rating: 4,
  },
  {
    name: 'Cody Fisher',
    profession: 'Product Manager, Parkview Int.Ltd',
    comment:
      'They designed, built, and handed over documentation our team could actually pick up. No lock-in, no mystery code.',
    imgSrc: '/images/testimonial/user3.svg',
    rating: 5,
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
      { label: 'About Us', href: '#About' },
      { label: 'Team', href: '#Team' },
      { label: 'FAQ', href: '#FAQ' },
      { label: 'Blog', href: '#Blog' },
    ],
  },
  {
    section: 'Category',
    links: [
      { label: 'Design', href: '/' },
      { label: 'Mockup', href: '/' },
      { label: 'View all', href: '/' },
      { label: 'Log In', href: '/' },
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

export const GET = () => {
  return NextResponse.json({
    headerData,
    Aboutdata,
    WorkData,
    FeaturedData,
    PlansData,
    TestimonialsData,
    ArticlesData,
    FooterLinksData,
  })
}
