'use client'
import getRequest from "@/lib/getter";
import { useToken } from "@/context/Token";
import { useCart } from "@/context/Cart";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import SuccessHeader from "@/components/checkoutConfirmation/successHeader";
import OrderDetails from "@/components/checkoutConfirmation/orderDetails";
import ShippingInfo from "@/components/checkoutConfirmation/shippingInfo";
import NextSteps from "@/components/checkoutConfirmation/nextSteps";
import ActionButtons from "@/components/checkoutConfirmation/actionButtons";
import { useSearchParams } from "next/navigation";
 function Confirmation() {
  const { setCart } = useCart();
    const { token } = useToken();
    const locale = useLocale();
    const [orderData, setOrderData] = useState<any>(null);
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId');
    const paymentId=searchParams.get('id');
    console.log(paymentId);

    const getOrderData = async () => {
        if (!token) {
            console.error('No token available');
            return;
        }
        
        const orderData=  await getRequest(`/order/orders/${orderId}`,{},{},locale,token);

        setOrderData(orderData);
        if(paymentId){
            const paymentData=  await getRequest(`/payment/hyper-pay/check-status`,{},{id:String(paymentId)},locale,token);
            console.log(paymentData);
        }
        setCart(null);
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
