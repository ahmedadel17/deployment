import React from 'react';
import DeleteButton from '../ui/DeleteButton';

interface Address {
  id: number;
  label: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  street: string;
  contact_phone: string;
  notes: string;
}

interface AddressRadioButtonProps {
  address: Address;
  name: string;
  value: string;
  className?: string;
  labelClassName?: string;
  radioClassName?: string;
  contentClassName?: string;
  onDelete?: (addressId: number) => void;
  showDeleteButton?: boolean;
  onChange?: (value: string) => void;
  checked?: boolean;
}

const AddressRadioButton: React.FC<AddressRadioButtonProps> = ({
  address,
  name,
  value,
  className = "",
  labelClassName = "flex items-start p-4 border border-gray-200 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer",
  radioClassName = "text-primary-600 mt-1",
  contentClassName = "ml-3 flex-1",
  onDelete,
  showDeleteButton = false,
  onChange,
  checked = false
}) => {
  return (
    <label 
      key={address.id} 
      className={`${labelClassName} ${className}`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={(e) => {
          if (onChange) {
            onChange(e.target.value);
          }
        }}
        className={radioClassName}
      />
       <div className={contentClassName}>
         <div className="flex items-center justify-between">
           <h4 className="text-sm font-medium text-gray-900 dark:text-white">
             {address.label}
           </h4>
           {showDeleteButton && onDelete && (
             <div 
               className="ml-2" 
               onClick={(e) => {
                 e.preventDefault();
                 e.stopPropagation();
               }}
               onMouseDown={(e) => {
                 e.preventDefault();
                 e.stopPropagation();
               }}
             >
               <DeleteButton
                 onDelete={() => onDelete(address.id)}
                 size="sm"
                 variant="icon"
                 className="text-gray-400 hover:text-red-500 transition-colors"
               />
             </div>
           )}
         </div>
         <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
         <p>{address.address}</p>
          <p>{address.street}, {address.contact_phone}</p>
          <p>{address.notes}</p>
        </div>
       </div>
    </label>
  );
};

export default AddressRadioButton;
