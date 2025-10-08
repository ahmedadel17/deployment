import React from 'react';
import { Field } from 'formik';
import Image from 'next/image';
import { useOrderState } from '@/context/OrderStateContext';
interface ShippingOption {
  slug: string;
  name: string;
  price: string;
  description: string;
  image: string;
  value: string;
  label: string;
}

interface ShippingMethodRadioButtonProps {
  option: ShippingOption;
  name: string;
  className?: string;
  labelClassName?: string;
  radioClassName?: string;
  contentClassName?: string;
  onChange?: (value: string) => void;
}

const ShippingMethodRadioButton: React.FC<ShippingMethodRadioButtonProps> = ({
  option,
  name,
  className = "",
  labelClassName = "flex items-center p-3 border border-gray-200 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer",
  radioClassName = "text-primary-600",
  contentClassName = "ms-3 flex-1",
  onChange
}) => {
  const { orderState } = useOrderState();
  return (
    <label 
      key={option.slug} 
      className={`${labelClassName} ${className}`}
    >
      <Field
        type="radio"
        name={name}
        value={option.slug}
        checked={orderState.shipping_slug === option.slug}
        className={radioClassName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (onChange) {
            onChange(e.target.value);
          }
        }}
      />
      <div className={contentClassName}>
      <div className="ms-3 flex-1 w-full">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                      <Image className='rounded-lg w-10 h-10 mr-2'  src={option.image} alt={option.name} width={100} height={100} />

                        <div>
                        <div className="flex justify-between w-full">
                            <span className="font-medium text-gray-900 dark:text-white w-full">{option.name}</span>
                            <span className="font-medium text-gray-900 dark:text-white"><span className="icon-riyal-symbol ms-1"></span>{option.price}</span>
                        </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{option.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
    
      </div>
    </label>
  );
};

export default ShippingMethodRadioButton;
