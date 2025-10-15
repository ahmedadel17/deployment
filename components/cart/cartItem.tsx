'use client'
import Image from 'next/image'
import DeleteButton from '../ui/DeleteButton'
import { useCart } from '@/context/Cart'
import { deleteCartItem } from '@/lib/cartHelpers'
import { useToken } from '@/context/Token'
import { useLocale } from 'next-intl'
import postRequest from '@/lib/post'
import QuantityInput from '../QuantityInput'
import { useState } from 'react'
import toastHelper from '@/lib/toastHelper'
function CartItem({item, idx}: {item: any, idx: number}) {
  const { Cart, setCart } = useCart();
  const { token } = useToken();
  console.log(token);
  const locale = useLocale();
  const [isLoading, setIsLoading] = useState(false);
  const deleteItem = async (item_id: string) => {
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

  const updateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    // Only update local state for UI responsiveness
    setCart(prevItems => {
      if (!prevItems) return prevItems;
      const updatedProducts = [...prevItems.products];
      updatedProducts[index] = { ...updatedProducts[index], qty: newQuantity };
      return { ...prevItems, products: updatedProducts };
    });
  };
const updateCartItemQty = async (item_id: string, newQuantity: number) => {
  try {
    setIsLoading(true);
    
    const response = await postRequest('/marketplace/cart/update-quantity-cart', {
      order_id: Cart?.id,
      cart_item_id: item_id,
      qty: newQuantity,
      type: 'product'
    }, {}, token, locale);
    toastHelper(response.data.status,response.data.message);
    setCart(response.data.data);
  } catch (error) {
    console.error('Failed to update item quantity:', error);
  } finally {
    setIsLoading(false);
  }
}
  return (
    <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
    <div className="flex flex-col md:flex-row gap-4">
      <div className="md:w-32 md:h-32 w-full h-48">
        <Image width={100} height={100} src={item.image as string} alt={String(item.name)} className="w-full h-full object-cover rounded-md" />
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {String(item.name)}
             <span className="text-xs text-gray-600 dark:text-gray-400">
               {item?.variation && String(item.variation)}
             </span>
            </h3>
         
       
        <DeleteButton
          onDelete={() => deleteItem(String(item.id))}
          size="md"
          variant="icon"
        />
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
          {item.variations && <span>{String(item.variations)}</span>}
          {item.color && <span>Color: {String(item.color)}</span>}
          {item.size && <span>Size: {String(item.size)}</span>}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600 dark:text-gray-400">Qty:</span>
            <QuantityInput
              value={item.qty}
              onChange={(newQuantity) => updateQuantity(idx, newQuantity)}
              min={1}
              max={99}
              className="ml-2"
            />
             <button 
               className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 rounded-md transition-colors ${
                 isLoading 
                   ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed' 
                   : 'bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-500'
               }`}
               onClick={() => updateCartItemQty(String(item.id), item.qty)}
               disabled={isLoading}
             >
               {isLoading ? (
                 <div className="flex items-center">
                   <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-gray-500 mr-1 sm:mr-2"></div>
                   <span className="hidden sm:inline">Updating...</span>
                   <span className="sm:hidden">...</span>
                 </div>
               ) : (
                 'Update'
               )}
             </button>
          </div>

          <div className="text-right sm:text-right">
            <div className="flex items-center justify-end space-x-1">
              {item.price_before_discount && item.price_before_discount > item.price && (
                <span className="text-sm text-gray-500 dark:text-gray-400 line-through mr-2">
                  <span className="icon-riyal-symbol text-xs"></span>
                  {Number(item.price_before_discount).toFixed(2)}
                </span>
              )}
              <span className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                <span className="icon-riyal-symbol text-sm"></span>
                {Number(item.price).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default CartItem
