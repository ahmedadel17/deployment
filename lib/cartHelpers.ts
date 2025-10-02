import postRequest from './post';

export interface DeleteItemParams {
  orderId: string;
  itemId: string;
  token: string | null;
  locale: string;
}

export interface DeleteItemResponse {
  products: any[];
  data: any;
}

export const deleteCartItem = async ({
  orderId,
  itemId,
  token,
  locale
}: DeleteItemParams): Promise<DeleteItemResponse> => {
  const response = await postRequest('/marketplace/cart/delete-item-from-cart', {
    order_id: orderId,
    cart_item_id: itemId,
    type: 'product'
  }, {}, token, locale);
  
  return {
    products: response.data.data.products,
    data: response.data.data
  };
};
