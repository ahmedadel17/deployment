import Image from 'next/image'
function CartItem({item, idx}: {item: any, idx: number}) {
  console.log('item', item);
  return (
    <div>
        
              <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="md:w-32 md:h-32 w-full h-48">
                    <Image width={100} height={100} src={item.image} alt={item.title} className="w-full h-full object-cover rounded-md" />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                      <button className="text-gray-400 hover:text-red-500 transition-colors" aria-label="Remove item">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                      <span>Color: {item.color}</span>
                      <span>Size: {item.size}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Qty:</span>
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
                            <button className="px-3 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" aria-label="Decrease">-</button>
                            <input type="number" value={item.qty} readOnly className="w-16 !rounded-none border-0 focus:outline-none" />
                            <button className="px-3 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" aria-label="Increase">+</button>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          {item.price_old && (
                            <span className="text-gray-500 dark:text-gray-400 line-through text-sm">
                              <span className="icon-riyal-symbol"></span>
                              <span>{item.price_old}</span>
                            </span>
                          )}
                          <span className="text-lg font-semibold text-gray-900 dark:text-white">
                            <span className="icon-riyal-symbol"></span>
                            {item.price}
                          </span>
                        </div>
                        {item.price_each && (
                          <p className="text-xs text-gray-500 dark:text-gray-400">{item.price_each} each</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
    </div>
  )
}

export default CartItem
