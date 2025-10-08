import React from 'react'

function ActionButtons() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
    <a href="dashboard-track.php" className="te-btn te-btn-primary">
        Track Your Order
    </a>
    <a href="index.php" className="te-btn te-btn-default">
        Continue Shopping
    </a>
</div>
  )
}

export default ActionButtons
