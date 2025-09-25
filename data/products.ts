import { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: 1,
    image: '/assets/images/product-1.jpg',
    hover: '/assets/images/product-1-flip.jpg',
    title: 'Embroidered crew neck T-shirt',
    price: '720.00',
    old_price: '850.00',
    colors: ['blue', 'black', 'gray'],
    sizes: ['SX', 'S', 'M', 'L', 'XL'],
    category: 'Mens',
    badges: [
      { type: 'sale', text: 'SALE' }
    ],
    description: 'Comfortable crew neck t-shirt with embroidered design',
    rating: 4.2,
    reviews: 89,
    stock: 'In Stock',
    images: [
      '/assets/images/product-1.jpg',
      '/assets/images/product-1-flip.jpg'
    ]
  },
  {
    id: 2,
    image: '/assets/images/product-2.jpg',
    hover: '/assets/images/product-2-flip.jpg',
    title: 'Cute short-sleeved T-shirt with brand logo',
    price: '150.00',
    old_price: null,
    colors: ['white', 'green', 'orange'],
    sizes: ['M', 'L'],
    category: 'Mens',
    badges: [
      { type: 'bestseller', text: 'BEST SELLER' }
    ],
    description: 'Short-sleeved t-shirt featuring our brand logo',
    rating: 4.5,
    reviews: 156,
    stock: 'In Stock',
    images: [
      '/assets/images/product-2.jpg',
      '/assets/images/product-2-flip.jpg'
    ]
  },
  {
    id: 3,
    image: '/assets/images/product-3.jpg',
    title: 'Long-sleeved shirt with brand logo embroidery',
    price: '450.00',
    old_price: null,
    colors: ['red', 'blue', 'white'],
    sizes: ['40', '41', '42', '43'],
    category: 'Mens',
    badges: [
      { type: 'new', text: 'NEW' }
    ],
    description: 'Long-sleeved shirt with embroidered brand logo',
    rating: 4.0,
    reviews: 67,
    stock: 'In Stock',
    images: [
      '/assets/images/product-3.jpg'
    ]
  },
  {
    id: 4,
    image: '/assets/images/product-4.jpg',
    title: 'Straight-leg jeans',
    price: '1,200.00',
    colors: ['brown', 'orange'],
    sizes: ['M', 'L'],
    category: 'Mens',
    badges: [
      { type: 'sale', text: 'SALE' }
    ],
    description: 'Classic straight-leg jeans in premium denim',
    rating: 4.3,
    reviews: 234,
    stock: 'In Stock',
    images: [
      '/assets/images/product-4.jpg'
    ]
  },
  {
    id: 5,
    image: '/assets/images/product-6.jpg',
    hover: '/assets/images/product-6-2.jpg',
    title: 'Mercer 7 Inch Chino Shorts',
    price: '200.00',
    old_price: '300.00',
    colors: ['brown', 'orange'],
    sizes: ['M', 'L'],
    category: 'Mens',
    badges: [
      { type: 'hot', text: 'HOT' }
    ],
    description: 'Comfortable 7-inch chino shorts perfect for summer',
    rating: 4.4,
    reviews: 123,
    stock: 'In Stock',
    images: [
      '/assets/images/product-6.jpg',
      '/assets/images/product-6-1.jpg',
      '/assets/images/product-6-2.jpg',
      '/assets/images/product-6-3.jpg',
      '/assets/images/product-6-4.jpg'
    ]
  },
  {
    id: 6,
    image: '/assets/images/425-1044mn001-4_ivory_2.jpg',
    hover: '/assets/images/425-1044mn001-4_ivory_4.jpg',
    title: 'Plain pants with a drawstring waist',
    price: '100.00',
    colors: ['white', 'black'],
    sizes: ['SX', 'S', 'M', 'L', 'XL'],
    category: 'Mens',
    description: 'Comfortable pants with drawstring waist for easy fit',
    rating: 4.1,
    reviews: 89,
    stock: 'In Stock',
    images: [
      '/assets/images/425-1044mn001-4_ivory_2.jpg',
      '/assets/images/425-1044mn001-4_ivory_4.jpg'
    ]
  },
  {
    id: 7,
    image: '/assets/images/product-7.jpg',
    hover: '/assets/images/product-7-flip.jpg',
    title: 'Floral Print Summer Dress',
    price: '890.00',
    old_price: '1200.00',
    colors: ['pink', 'white', 'yellow'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'Womens',
    badges: [
      { type: 'sale', text: 'SALE' }
    ],
    description: 'Beautiful floral print summer dress perfect for warm weather',
    rating: 4.6,
    reviews: 178,
    stock: 'In Stock',
    images: [
      '/assets/images/product-7.jpg',
      '/assets/images/product-7-flip.jpg'
    ]
  },
  {
    id: 8,
    image: '/assets/images/product-8.jpg',
    hover: '/assets/images/product-8-flip.jpg',
    title: 'High-Waisted Skinny Jeans',
    price: '650.00',
    old_price: null,
    colors: ['blue', 'black', 'white'],
    sizes: ['24', '26', '28', '30', '32'],
    category: 'Womens',
    badges: [
      { type: 'new', text: 'NEW' }
    ],
    description: 'Stylish high-waisted skinny jeans for a flattering fit',
    rating: 4.3,
    reviews: 145,
    stock: 'In Stock',
    images: [
      '/assets/images/product-8.jpg',
      '/assets/images/product-8-flip.jpg'
    ]
  },
  {
    id: 9,
    image: '/assets/images/product-9.jpg',
    hover: '/assets/images/product-9-flip.jpg',
    title: 'Silk Blouse with Bow Tie',
    price: '1150.00',
    old_price: '1400.00',
    colors: ['cream', 'black', 'navy'],
    sizes: ['XS', 'S', 'M', 'L'],
    category: 'Womens',
    badges: [
      { type: 'limited', text: 'LIMITED' }
    ],
    description: 'Elegant silk blouse with decorative bow tie detail',
    rating: 4.7,
    reviews: 92,
    stock: 'In Stock',
    images: [
      '/assets/images/product-9.jpg',
      '/assets/images/product-9-flip.jpg'
    ]
  },
  {
    id: 10,
    image: '/assets/images/product-10.jpg',
    hover: '/assets/images/product-10-flip.jpg',
    title: 'Knitted Cardigan Sweater',
    price: '780.00',
    old_price: null,
    colors: ['beige', 'gray', 'burgundy'],
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Womens',
    badges: [
      { type: 'bestseller', text: 'BEST SELLER' }
    ],
    description: 'Cozy knitted cardigan sweater perfect for layering',
    rating: 4.4,
    reviews: 203,
    stock: 'In Stock',
    images: [
      '/assets/images/product-10.jpg',
      '/assets/images/product-10-flip.jpg'
    ]
  },
  {
    id: 11,
    image: '/assets/images/product-17.jpg',
    hover: '/assets/images/product-17-flip.jpg',
    title: 'Rainbow Unicorn T-Shirt',
    price: '180.00',
    old_price: '220.00',
    colors: ['pink', 'purple', 'white'],
    sizes: ['40', '41', '42', '43'],
    category: 'Kids',
    badges: [
      { type: 'sale', text: 'SALE' }
    ],
    description: 'Fun rainbow unicorn t-shirt for kids',
    rating: 4.8,
    reviews: 67,
    stock: 'In Stock',
    images: [
      '/assets/images/product-17.jpg',
      '/assets/images/product-17-flip.jpg'
    ]
  },
  {
    id: 12,
    image: '/assets/images/product-18.jpg',
    hover: '/assets/images/product-18-flip.jpg',
    title: 'Dinosaur Print Hoodie',
    price: '280.00',
    old_price: null,
    colors: ['green', 'blue', 'gray'],
    sizes: ['40', '41', '42', '43'],
    category: 'Kids',
    badges: [
      { type: 'hot', text: 'HOT' }
    ],
    description: 'Adorable dinosaur print hoodie for little adventurers',
    rating: 4.5,
    reviews: 89,
    stock: 'In Stock',
    images: [
      '/assets/images/product-18.jpg',
      '/assets/images/product-18-flip.jpg'
    ]
  },
  {
    id: 13,
    image: '/assets/images/product-19.jpg',
    hover: '/assets/images/product-19-flip.jpg',
    title: 'Tutu Dress with Sparkles',
    price: '350.00',
    old_price: '450.00',
    colors: ['pink', 'purple', 'gold'],
    sizes: ['40', '41', '42', '43'],
    category: 'Kids',
    badges: [
      { type: 'sale', text: 'SALE' }
    ],
    description: 'Magical tutu dress with sparkles for special occasions',
    rating: 4.9,
    reviews: 45,
    stock: 'In Stock',
    images: [
      '/assets/images/product-19.jpg',
      '/assets/images/product-19-flip.jpg'
    ]
  },
  {
    id: 14,
    image: '/assets/images/product-20.jpg',
    hover: '/assets/images/product-20-flip.jpg',
    title: 'Superhero Cape Set',
    price: '320.00',
    old_price: null,
    colors: ['red', 'blue', 'black'],
    sizes: ['40', '41', '42', '43'],
    category: 'Kids',
    badges: [
      { type: 'new', text: 'NEW' }
    ],
    description: 'Complete superhero cape set for imaginative play',
    rating: 4.6,
    reviews: 78,
    stock: 'In Stock',
    images: [
      '/assets/images/product-20.jpg',
      '/assets/images/product-20-flip.jpg'
    ]
  },
  {
    id: 15,
    image: '/assets/images/product-21.jpg',
    hover: '/assets/images/product-21-flip.jpg',
    title: 'Striped Overalls',
    price: '420.00',
    old_price: '500.00',
    colors: ['denim', 'white', 'pink'],
    sizes: ['40', '41', '42', '43'],
    category: 'Kids',
    badges: [
      { type: 'limited', text: 'LIMITED EDITION' }
    ],
    description: 'Stylish striped overalls perfect for active kids',
    rating: 4.3,
    reviews: 56,
    stock: 'In Stock',
    images: [
      '/assets/images/product-21.jpg',
      '/assets/images/product-21-flip.jpg'
    ]
  }
];

export const getProducts = (filters?: {
  category?: string;
  limit?: number;
  sort?: string;
}): Product[] => {
  let filteredProducts = [...products];

  if (filters?.category) {
    filteredProducts = filteredProducts.filter(
      product => product.category === filters.category
    );
  }

  if (filters?.sort) {
    switch (filters.sort) {
      case 'price_asc':
        filteredProducts.sort((a, b) => {
          const aNum = typeof a.price === 'string' ? parseFloat(a.price.replace(/,/g, '')) : Number(a.price);
          const bNum = typeof b.price === 'string' ? parseFloat(b.price.replace(/,/g, '')) : Number(b.price);
          return aNum - bNum;
        });
        break;
      case 'price_desc':
        filteredProducts.sort((a, b) => {
          const aNum = typeof a.price === 'string' ? parseFloat(a.price.replace(/,/g, '')) : Number(a.price);
          const bNum = typeof b.price === 'string' ? parseFloat(b.price.replace(/,/g, '')) : Number(b.price);
          return bNum - aNum;
        });
        break;
      case 'newest':
        filteredProducts.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }
  }

  if (filters?.limit) {
    filteredProducts = filteredProducts.slice(0, filters.limit);
  }

  return filteredProducts;
};

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};


