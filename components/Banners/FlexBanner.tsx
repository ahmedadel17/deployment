import React from 'react'
import Image from 'next/image'
function FlexBanner() {
  return (
    <section className="te-section-small dark:bg-gray-800">
    <div className="container p-4">
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            <a href="#"><Image  src="/assets/images/banner-2.jpg" alt="Banner 1" className="w-full object-cover rounded-xl" width={600} height={400} /></a>
            <a href="#"><Image  src="/assets/images/banner-3.jpg" alt="Banner 1" className="w-full object-cover rounded-xl" width={600} height={400}/></a>
        </div>
    </div>
</section>
  )
}

export default FlexBanner
