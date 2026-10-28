'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { HeaderItem } from '@/app/types/menu'

const ArrowRight = ({ className = '' }: { className?: string }) => (
  <svg
    viewBox='0 0 16 16'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    aria-hidden='true'
    className={className}>
    <path d='M3 8h10M9 4l4 4-4 4' />
  </svg>
)

const Header: React.FC = () => {
  const [navbarOpen, setNavbarOpen] = useState(false)
  const [sticky, setSticky] = useState(false)

  const menuRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    setSticky(window.scrollY >= 80)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      navbarOpen
    ) {
      setNavbarOpen(false)
    }
  }

  useEffect(() => {
    // Passive: never block the browser's scroll compositor while listening.
    window.addEventListener('scroll', handleScroll, { passive: true })
    document.addEventListener('mousedown', handleClickOutside)
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setNavbarOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [navbarOpen])

  useEffect(() => {
    document.body.style.overflow = navbarOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [navbarOpen])

  // header data fetch

  const [headerData, setHeaderData] = useState<HeaderItem[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/data')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setHeaderData(data.headerData)
      } catch (error) {
        console.error('Error fetching services:', error)
      }
    }
    fetchData()
  }, [])

  return (
    <>
      {/* Pill header */}
      <header
        className='pointer-events-none fixed top-0 z-[55] w-full px-3 [-webkit-tap-highlight-color:transparent]'
        style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 0.625rem)' }}>
        <div
          className={`mx-auto pointer-events-auto flex h-14 max-w-[75rem] items-center justify-between gap-2 rounded-full border border-primary/10 px-1.5 backdrop-blur-md transition-shadow duration-300 ${
            sticky
              ? 'bg-white/95 shadow-[0_10px_30px_rgba(0,34,74,0.14)]'
              : 'bg-white/90 shadow-[0_4px_18px_rgba(0,34,74,0.07)]'
          }`}>
          {/* Brand */}
          <Link
            href='/'
            aria-label='AeroQuant Labs — home'
            className='flex min-w-0 items-center gap-2.5 rounded-full pl-1'>
            <Image
              src='/images/logo/aeroquant-labs.jpg'
              alt='AeroQuant Labs logo'
              width={40}
              height={40}
              priority
              className='rounded-full object-cover shadow-[0_0_0_2px_#fff,0_0_0_3px_rgba(0,102,255,0.18)]'
            />
            <span className='flex min-w-0 flex-col leading-tight'>
              <span className='whitespace-nowrap text-[17px] font-extrabold tracking-tight'>
                Aero<span className='text-primary'>Quant</span> Labs
              </span>
              <span className='flex items-center gap-1.5 whitespace-nowrap text-[11px] font-semibold text-black/55'>
                <span
                  aria-hidden
                  className='relative inline-block h-[7px] w-[7px] rounded-full bg-[#16c47f] after:absolute after:inset-0 after:rounded-full after:bg-[#16c47f] after:content-[""] after:animate-[livePulse_2s_ease-out_infinite]'></span>
                Available for projects
              </span>
            </span>
          </Link>

          {/* Desktop links */}
          <nav
            className='hidden items-center gap-7 lg:flex'
            aria-label='Primary'>
            {headerData.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className='text-[15px] font-semibold text-darkmode/75 transition-colors hover:text-primary'>
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Contact pill + hamburger */}
          <div className='flex items-center gap-2'>
            <Link
              href='/contact'
              className='hidden items-center gap-2 rounded-full bg-primary py-1.5 pl-4 pr-1.5 text-sm font-bold text-white shadow-[0_6px_16px_rgba(0,102,255,0.25)] transition-colors hover:bg-darkmode sm:flex'>
              Contact
              <span className='flex h-7 w-7 items-center justify-center rounded-full bg-white text-primary'>
                <ArrowRight className='h-3.5 w-3.5' />
              </span>
            </Link>
            <button
              type='button'
              onClick={() => setNavbarOpen(!navbarOpen)}
              className={`relative flex h-11 w-11 flex-none items-center justify-center rounded-full border transition-colors ${
                navbarOpen
                  ? 'border-darkmode bg-darkmode'
                  : 'border-primary/5 bg-[#f4f5f6] hover:bg-[#e9ebee]'
              }`}
              aria-label='Toggle mobile menu'
              aria-expanded={navbarOpen}
              aria-controls='site-nav-menu'>
              <span
                className={`absolute left-1/2 -ml-[9px] h-0.5 w-[18px] rounded-full transition-all duration-300 ${
                  navbarOpen
                    ? 'top-1/2 -mt-px rotate-45 bg-white'
                    : 'top-[calc(50%-4px)] bg-darkmode'
                }`}></span>
              <span
                className={`absolute left-1/2 -ml-[9px] h-0.5 w-[18px] rounded-full transition-all duration-300 ${
                  navbarOpen
                    ? 'top-1/2 -mt-px -rotate-45 bg-white'
                    : 'top-[calc(50%+2px)] bg-darkmode'
                }`}></span>
              </button>
          </div>
        </div>
      </header>

      {/* Dimmed backdrop */}
      <div
        className={`fixed inset-0 z-[44] bg-[#00224a]/35 backdrop-blur-[3px] transition-opacity duration-300 ${
          navbarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      {/* Menu panel */}
      <div
        ref={menuRef}
        id='site-nav-menu'
        aria-hidden={!navbarOpen}
        className={`fixed left-3 right-3 z-[50] max-h-[calc(100dvh-5.5rem)] overflow-y-auto rounded-[1.75rem] border border-primary/10 bg-white p-5 pb-6 shadow-[0_24px_48px_rgba(0,34,74,0.18)] transition-all duration-300 ${
          navbarOpen
            ? 'visible scale-100 opacity-100'
            : 'invisible -translate-y-2 scale-[0.98] opacity-0'
        }`}
        style={{
          top: 'calc(env(safe-area-inset-top, 0px) + 4.625rem)',
          transformOrigin: 'top center',
        }}>
        <nav className='flex flex-col' aria-label='Menu'>
          {headerData.map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setNavbarOpen(false)}
              style={{ transitionDelay: navbarOpen ? `${index * 40}ms` : '0ms' }}
              className={`flex items-center gap-4 border-b border-primary/10 px-1 py-[1.05rem] text-[24px] font-bold tracking-tight text-darkmode transition-all duration-300 hover:text-primary ${
                navbarOpen ? 'translate-y-0 opacity-100' : 'translate-y-1.5 opacity-0'
              }`}>
              <span className='min-w-5 text-xs font-bold tracking-wide text-primary'>
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className='flex-1'>{item.label}</span>
              <ArrowRight className='h-[18px] w-[18px] text-black/30' />
            </Link>
          ))}
        </nav>
        <div className='pt-6'>
          <Link
            href='/contact'
            onClick={() => setNavbarOpen(false)}
            className='flex items-center justify-between rounded-full bg-primary py-2 pl-6 pr-2 text-[17px] font-bold text-white shadow-[0_10px_24px_rgba(0,102,255,0.28)] transition-colors hover:bg-darkmode'>
            Start a project
            <span className='flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary'>
              <ArrowRight className='h-4 w-4' />
            </span>
          </Link>
          <p className='mt-4 text-center text-sm text-black/55'>
            Prefer email?{' '}
            <a
              href='mailto:AeroQuantLabs55@gmail.com'
              className='font-bold text-darkmode transition-colors hover:text-primary'>
              AeroQuantLabs55@gmail.com
            </a>
          </p>
        </div>
      </div>
    </>
  )
}

export default Header
