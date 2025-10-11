'use client'
import Image from 'next/image'
import { useCart } from '@/context/Cart'
import { CartItem } from '@/types/cart'
import DeleteButton from '@/components/ui/DeleteButton'
import { useToken } from '@/context/Token'
import { useLocale } from 'next-intl'
import { deleteCartItem } from '@/lib/cartHelpers'
import toastHelper from '@/lib/toastHelper'

export default function DropDownCartItem() {
  const { Cart, setCart } = useCart();
  const { token, isInitialized } = useToken();
  const locale = useLocale();
  const deleteItem = async (item_id: string) => {
    if (!isInitialized || !token) {
      console.log('Token not available yet');
      return;
    }
    
    try {
      
      const response = await deleteCartItem({
        orderId: (Cart as { id?: string })?.id || '',
        itemId: item_id,
        token,
        locale
      });

      toastHelper(response.data.status,response.data.message,'Item deleted successfully','Item not deleted');
      setCart(response.data);
      localStorage.setItem('cart', JSON.stringify(response.products || []));
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
  }
  return (
    <>
      {
      Cart?.products?.map((item, index: number) => (
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
          <DeleteButton
            onDelete={() => deleteItem(item.id.toString())}
            size="md"
            variant="icon"
          />
        </div>
      ))}
    </>
  )
}



