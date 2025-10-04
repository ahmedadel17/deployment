'use client'
import React from 'react';

interface ActionButtonProps {
  type: 'checkout' | 'whatsapp';
  isDisabled?: boolean;
  onClick?: () => void;
  href?: string;
  className?: string;
  children?: React.ReactNode;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  type,
  isDisabled = false,
  onClick,
  href,
  className = '',
  children
}) => {
  const getButtonContent = () => {
    if (type === 'checkout') {
      return {
        icon: (
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="8" cy="21" r="1"></circle>
            <circle cx="19" cy="21" r="1"></circle>
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
          </svg>
        ),
        text: 'Buy Now',
        baseClasses: 'w-full py-1 te-btn flex gap-2 text-center',
        enabledClasses: 'bg-gray-800 text-white hover:bg-gray-600',
        disabledClasses: 'bg-gray-400 text-gray-600 cursor-not-allowed pointer-events-none'
      };
    } else if (type === 'whatsapp') {
      return {
        icon: (
          <svg className="w-4 h-4" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.386" />
          </svg>
        ),
        text: 'Contact via WhatsApp',
        baseClasses: 'w-full py-3 font-medium rounded-md flex gap-2 items-center justify-center transition-colors',
        enabledClasses: 'bg-[#075E54] hover:bg-green-600 text-white',
        disabledClasses: 'bg-gray-400 text-gray-600 cursor-not-allowed'
      };
    }
    return null;
  };

  const content = getButtonContent();
  if (!content) return null;

  const combinedClassName = `
    ${content.baseClasses}
    ${isDisabled ? content.disabledClasses : content.enabledClasses}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  const buttonContent = (
    <>
      {content.icon}
      <span>{children || content.text}</span>
    </>
  );

  if (type === 'checkout' && href) {
    return (
      <a 
        href={isDisabled ? "#" : href}
        className={combinedClassName}
      >
        {buttonContent}
      </a>
    );
  }

  return (
    <button
      className={combinedClassName}
      disabled={isDisabled}
      onClick={onClick}
    >
      {buttonContent}
    </button>
  );
};

export default ActionButton;
