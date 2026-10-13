const TechNewsSkeleton = () => {
  return (
    <div
      role='status'
      className='animate-pulse overflow-hidden rounded-3xl border border-black/[0.06] bg-white shadow-testimonial'>
      <div className='aspect-[16/9] w-full bg-gray-200'></div>
      <div className='p-5 sm:p-6'>
        <div className='mb-3 flex items-center gap-2'>
          <div className='h-[18px] w-[18px] rounded bg-gray-200'></div>
          <div className='h-3 w-24 rounded-full bg-gray-200'></div>
        </div>
        <div className='mb-2.5 h-3 w-full rounded-full bg-gray-200'></div>
        <div className='mb-2.5 h-3 w-full rounded-full bg-gray-200'></div>
        <div className='mb-5 h-3 w-2/3 rounded-full bg-gray-200'></div>
        <div className='flex items-center gap-5 border-t border-black/5 pt-4'>
          <div className='h-3 w-12 rounded-full bg-gray-200'></div>
          <div className='h-3 w-12 rounded-full bg-gray-200'></div>
        </div>
      </div>
      <span className='sr-only'>Loading...</span>
    </div>
  )
}

export default TechNewsSkeleton
