import React from 'react'
import Image from 'next/image'
function LargeBanner() {
  return (
      <section className="te-section-small !pt-0bg-gray-50 dark:bg-gray-900">
    <div className="container">
        <Image  src="/assets/images/banner-1.jpg" alt="Banner 1" className="w-full object-cover rounded-2xl" width={1200} height={400} />
    </div>
</section>
  )
}

export default LargeBanner
