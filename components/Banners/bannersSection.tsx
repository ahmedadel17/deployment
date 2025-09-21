import React from 'react'
import SmallBanner from './smallBanner'

function BannersSection() {
  return (
      <section className='te-section-small bg-gray-50 dark:bg-gray-900'>
    <div className="container">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3 md:gap-4 lg:grid-cols-3 lg:gap-6">

<SmallBanner />
<SmallBanner />
<SmallBanner />
        </div>
    </div>
</section>
  )
}

export default BannersSection
