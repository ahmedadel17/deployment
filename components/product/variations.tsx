
import { ProductVariation } from '@/types/product';

function Variations({variations, isSelected, isUpdatingVariations, handleVariationSelect}: {variations: ProductVariation[], isSelected: (attributeId: string, value: string) => boolean, isUpdatingVariations: boolean, handleVariationSelect: (attributeId: string, value: string) => void}) {
  return (
    <div>
        
        <div className="space-y-6">
      {variations.map((variation) => (
        <div className="product-variation" key={variation.attribute_id}>
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
            {variation.attribute_name}
          </h4>
          
          {variation.attribute_type !== "color" && (
            <div className="grid grid-cols-4 gap-2">
              {variation.values.map((value, index) => (
                <button
                  key={index}
                  className={`size-option ${isSelected(variation.attribute_id, value.id) ? 'active' : ''} ${isUpdatingVariations ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => handleVariationSelect(variation.attribute_id, value.id)}
                  disabled={isUpdatingVariations}
                  aria-label={`Select ${variation.attribute_name} ${value.id}`}
                >
                  {value.value}
                </button>
              ))}
            </div>
          )}
          
          {variation.attribute_type === "color" && (
            <div className="flex flex-wrap gap-3">
              {variation.values.map((value, index) => (
                <button
                  key={index}
                  className={`color-option ${isSelected(variation.attribute_id, value.id) ? 'active' : ''} ${isUpdatingVariations ? 'opacity-50 cursor-not-allowed' : ''}`}
                  style={{ backgroundColor: value.color }}
                  onClick={() => handleVariationSelect(variation.attribute_id, value.id)}
                  disabled={isUpdatingVariations}
                  title={value.value}
                  aria-label={`Select color ${value.id}`}
                />
              ))}
            </div>
          )}
        </div>
      ))}
      
    </div>
    </div>
  )
}

export default Variations
