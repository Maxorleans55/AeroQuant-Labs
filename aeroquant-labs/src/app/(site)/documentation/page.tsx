import { Documentation } from '@/app/components/Documentation/Documentation'
import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Documentation | AeroQuant Labs',
}

export default function Page() {
  return (
    <>
      <Documentation />
    </>
  )
}
