'use client'
import getRequest from "@/lib/getter";
import tokenGetter from "@/lib/tokenGetter";
import { useCart } from "@/context/CartContext";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import SuccessHeader from "@/components/checkoutConfirmation/successHeader";
import OrderDetails from "@/components/checkoutConfirmation/orderDetails";
import ShippingInfo from "@/components/checkoutConfirmation/shippingInfo";
import NextSteps from "@/components/checkoutConfirmation/nextSteps";
import ActionButtons from "@/components/checkoutConfirmation/actionButtons";
import { useSearchParams } from "next/navigation";
 function Confirmation() {
    const locale = useLocale();
    const [orderData, setOrderData] = useState<any>(null);
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId');
    const getOrderData = async () => {
        const orderData=  await getRequest(`/order/orders/${orderId}`,{},locale,tokenGetter());
        setOrderData(orderData);
    }
    useEffect(() => {
        getOrderData();
    }, []);

  return (
    <div className='container mx-auto mt-6 mb-4' >
      
{/* <!-- Success Header --> */}
<SuccessHeader />

{/* <!-- Order Details --> */}
<OrderDetails orderData={orderData}/>

{/* <!-- Shipping & Contact Info --> */}
<ShippingInfo address={orderData?.data?.address} />

{/* <!-- Next Steps --> */}
{/* <NextSteps /> */}

{/* <!-- Action Buttons --> */}

<ActionButtons/>
{/* <!-- Email Confirmation Notice --> */}
{/* <EmailConfirmation /> */}

    </div>
  )
}

export default Confirmation
