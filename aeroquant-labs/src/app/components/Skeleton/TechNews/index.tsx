const TechNewsSkeleton = () => {
  return (
    <div
      role='status'
      className='animate-pulse rounded-3xl border border-black/[0.06] bg-white p-6 shadow-testimonial'>
      <div className='mb-5 flex items-center justify-between'>
        <div className='h-6 w-28 rounded-full bg-gray-200'></div>
        <div className='h-4 w-4 rounded bg-gray-200'></div>
      </div>
      <div className='mb-2.5 h-3 w-full rounded-full bg-gray-200'></div>
      <div className='mb-2.5 h-3 w-full rounded-full bg-gray-200'></div>
      <div className='mb-6 h-3 w-2/3 rounded-full bg-gray-200'></div>
      <div className='flex items-center gap-4 border-t border-black/5 pt-4'>
        <div className='h-3 w-10 rounded-full bg-gray-200'></div>
        <div className='h-3 w-10 rounded-full bg-gray-200'></div>
        <div className='ml-auto h-3 w-14 rounded-full bg-gray-200'></div>
      </div>
      <span className='sr-only'>Loading...</span>
    </div>
  )
}

export default TechNewsSkeleton
