
function OrderAttribute(props: {t: any}) {
  return (
    <div className="flex justify-between">
    <span style={{color: props.color}} className="text-gray-600 dark:text-gray-400">{props.label}</span>
    <span style={{color: props.color}} className="text-gray-900 dark:text-white">{props.showCurrency &&<span className="icon-riyal-symbol text-xs" />}<span>{props.value}</span></span>
  </div>
  
  )
}

export default OrderAttribute
