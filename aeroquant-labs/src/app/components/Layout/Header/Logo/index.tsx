import Image from 'next/image'
import Link from 'next/link'

const Logo: React.FC = () => {
  return (
    <Link
      href='/'
      className='logo-link flex items-center gap-3'
      aria-label='AeroQuant Labs — home'>
      <span className='relative inline-flex shrink-0'>
        <Image
          src='/images/logo/aeroquant-labs.jpg'
          alt='AeroQuant Labs logo'
          width={44}
          height={44}
          className='logo-mark rounded-full'
          priority
        />
        <span className='logo-orbit-ring' aria-hidden='true' />
      </span>
      <span className='text-2xl font-semibold tracking-tight whitespace-nowrap'>
        Aero<span className='text-primary'>Quant</span> Labs
      </span>
    </Link>
  )
}

export default Logo
