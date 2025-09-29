'use client'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import { CartItem } from '@/types/cart'

type Props = {
  items: CartItem[]
}

export default function DropDownCartItem({items}: Props) {
  const { cartItems, setCartItems } = useCart();
  const removeItem = (index: number) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  }
  return (
    <>
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-3 py-3 border-b border-gray-100 dark:border-gray-700">
          <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-md flex-shrink-0">
            {item.image && (
              <Image width={100} height={100} src={item.image} alt={String(item.name)} className="w-full h-full object-cover rounded-md" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-gray-900 dark:text-white whitespace-normal break-words">
              <a href="#" className="hover:text-primary-400">{item.name}</a>
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              Qty: {item.qty} × <span className="icon-riyal-symbol text-xs" /> <span>{item.price}</span>
            </div>
          </div>
          <button onClick={() => removeItem(index)} className="text-gray-400 hover:text-red-500 transition-colors" aria-label="Remove item">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      ))}
    </>
  )
}



