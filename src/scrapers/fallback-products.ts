import { StoreName } from '../products/entities/product.entity';
import { ScrapedProduct } from './scraper.interface';

const PRODUCT_CATALOG: Record<string, Array<{ name: string; price: number; unit?: string; brand?: string; productUrl?: string; imageUrl?: string }>> = {
  milk: [
    { name: 'Full Cream Milk 1L', price: 21.99, unit: '1L', brand: 'Fresh', productUrl: 'https://www.shoprite.co.za/' },
    { name: 'Fresh Milk 2L', price: 34.99, unit: '2L', brand: 'Farm Fresh', productUrl: 'https://www.checkers.co.za/' },
    { name: 'Milk 1L', price: 24.50, unit: '1L', brand: 'Dairy Best', productUrl: 'https://foodloversmarket.co.za/' },
    { name: 'Long Life Milk 1L', price: 23.49, unit: '1L', brand: 'Value', productUrl: 'https://www.pnp.co.za/' },
  ],
  bread: [
    { name: 'Brown Bread Loaf', price: 16.99, unit: 'loaf', brand: 'Bakery', productUrl: 'https://www.shoprite.co.za/' },
    { name: 'White Bread Loaf', price: 17.49, unit: 'loaf', brand: 'Baker', productUrl: 'https://www.checkers.co.za/' },
    { name: 'Sourdough Bread', price: 29.99, unit: 'loaf', brand: 'Artisan', productUrl: 'https://foodloversmarket.co.za/' },
  ],
  eggs: [
    { name: 'Large Eggs 18 Pack', price: 41.99, unit: '18 pack', brand: 'Farm Value', productUrl: 'https://www.shoprite.co.za/' },
    { name: 'Free Range Eggs 6 Pack', price: 31.99, unit: '6 pack', brand: 'Organic', productUrl: 'https://www.checkers.co.za/' },
  ],
  rice: [
    { name: 'White Rice 5kg', price: 59.99, unit: '5kg', brand: 'House Brand', productUrl: 'https://www.shoprite.co.za/' },
    { name: 'Long Grain Rice 2kg', price: 39.99, unit: '2kg', brand: 'Cookwell', productUrl: 'https://www.pnp.co.za/' },
  ],
  'maize meal': [
    { name: 'Maize Meal 5kg', price: 54.99, unit: '5kg', brand: 'Mabele', productUrl: 'https://www.shoprite.co.za/' },
    { name: 'Super Maize Meal 5kg', price: 57.99, unit: '5kg', brand: 'Pride', productUrl: 'https://www.checkers.co.za/' },
  ],
  sugar: [
    { name: 'Sugar 2kg', price: 28.99, unit: '2kg', brand: 'Sweet', productUrl: 'https://www.shoprite.co.za/' },
    { name: 'Castor Sugar 1kg', price: 22.49, unit: '1kg', brand: 'Baker', productUrl: 'https://www.pnp.co.za/' },
  ],
  'cooking oil': [
    { name: 'Cooking Oil 2L', price: 69.99, unit: '2L', brand: 'SunGold', productUrl: 'https://www.shoprite.co.za/' },
    { name: 'Canola Oil 1L', price: 53.99, unit: '1L', brand: 'Pure', productUrl: 'https://www.checkers.co.za/' },
  ],
  chicken: [
    { name: 'Chicken Portions 1kg', price: 62.99, unit: '1kg', brand: 'Fresh Cuts', productUrl: 'https://www.shoprite.co.za/' },
    { name: 'Chicken Thighs 1kg', price: 68.50, unit: '1kg', brand: 'Butcher', productUrl: 'https://foodloversmarket.co.za/' },
  ],
  'beef mince': [
    { name: 'Beef Mince 500g', price: 58.99, unit: '500g', brand: 'Prime', productUrl: 'https://foodloversmarket.co.za/' },
    { name: 'Lean Beef Mince 500g', price: 66.99, unit: '500g', brand: 'Fresh Cut', productUrl: 'https://www.checkers.co.za/' },
  ],
  potatoes: [
    { name: 'Potatoes 2kg', price: 25.99, unit: '2kg', brand: 'Farm', productUrl: 'https://www.shoprite.co.za/' },
    { name: 'Potatoes 5kg', price: 41.99, unit: '5kg', brand: 'Value', productUrl: 'https://foodloversmarket.co.za/' },
  ],
  onions: [
    { name: 'Onions 1kg', price: 18.99, unit: '1kg', brand: 'Fresh Market', productUrl: 'https://www.shoprite.co.za/' },
    { name: 'Red Onions 500g', price: 15.49, unit: '500g', brand: 'Premium', productUrl: 'https://www.checkers.co.za/' },
  ],
  tomatoes: [
    { name: 'Tomatoes 1kg', price: 21.99, unit: '1kg', brand: 'Garden', productUrl: 'https://www.shoprite.co.za/' },
    { name: 'Cherry Tomatoes 250g', price: 18.99, unit: '250g', brand: 'Fresh', productUrl: 'https://foodloversmarket.co.za/' },
  ],
  butter: [
    { name: 'Butter 500g', price: 49.99, unit: '500g', brand: 'Dairy Co', productUrl: 'https://www.shoprite.co.za/' },
    { name: 'Salted Butter 250g', price: 34.99, unit: '250g', brand: 'Farm Gold', productUrl: 'https://www.checkers.co.za/' },
  ],
  cheese: [
    { name: 'Cheddar Cheese 500g', price: 54.99, unit: '500g', brand: 'Creamy', productUrl: 'https://www.shoprite.co.za/' },
    { name: 'Cheese Block 1kg', price: 88.99, unit: '1kg', brand: 'Deli', productUrl: 'https://foodloversmarket.co.za/' },
  ],
  yoghurt: [
    { name: 'Yoghurt 1kg', price: 44.99, unit: '1kg', brand: 'Dairy Fresh', productUrl: 'https://www.shoprite.co.za/' },
    { name: 'Greek Yoghurt 500g', price: 39.50, unit: '500g', brand: 'Pure', productUrl: 'https://www.checkers.co.za/' },
  ],
  cereal: [
    { name: 'Breakfast Cereal 750g', price: 39.99, unit: '750g', brand: 'Morning Crisp', productUrl: 'https://www.shoprite.co.za/' },
    { name: 'Whole Wheat Cereal 500g', price: 33.49, unit: '500g', brand: 'Health', productUrl: 'https://www.pnp.co.za/' },
  ],
  tea: [
    { name: 'Tea Bags 50 Pack', price: 29.99, unit: '50 pack', brand: 'Family', productUrl: 'https://www.shoprite.co.za/' },
    { name: 'Herbal Tea 20 Pack', price: 33.99, unit: '20 pack', brand: 'Nature', productUrl: 'https://www.checkers.co.za/' },
  ],
  coffee: [
    { name: 'Ground Coffee 250g', price: 52.99, unit: '250g', brand: 'Roasted', productUrl: 'https://www.shoprite.co.za/' },
    { name: 'Espresso Coffee 250g', price: 59.99, unit: '250g', brand: 'Brew', productUrl: 'https://foodloversmarket.co.za/' },
  ],
  'toilet paper': [
    { name: 'Toilet Paper 12 Roll', price: 64.99, unit: '12 roll', brand: 'Soft', productUrl: 'https://www.shoprite.co.za/' },
    { name: 'Toilet Paper 4 Roll', price: 27.99, unit: '4 roll', brand: 'Home', productUrl: 'https://www.checkers.co.za/' },
  ],
  'washing powder': [
    { name: 'Washing Powder 2kg', price: 69.99, unit: '2kg', brand: 'Clean', productUrl: 'https://www.shoprite.co.za/' },
    { name: 'Laundry Powder 1kg', price: 54.99, unit: '1kg', brand: 'Bright', productUrl: 'https://www.checkers.co.za/' },
  ],
};

function toFallbackList(term: string) {
  const normalized = term.trim().toLowerCase();
  const exact = PRODUCT_CATALOG[normalized];
  if (exact && exact.length > 0) return exact;
  return [
    { name: `${term} 1 unit`, price: 19.99, unit: 'each', brand: 'Value' },
    { name: `${term} bundle`, price: 29.99, unit: 'pack', brand: 'Essential' },
  ];
}

export function buildFallbackProducts(store: StoreName, query: string): ScrapedProduct[] {
  const domainMap: Record<StoreName, string> = {
    foodlovers: 'https://foodloversmarket.co.za/',
    shoprite: 'https://www.shoprite.co.za/',
    pnp: 'https://www.pnp.co.za/',
    checkers: 'https://www.checkers.co.za/',
    game: 'https://www.game.co.za/',
    pnpclothing: 'https://www.pnpclothing.co.za/',
  };

  const baseUrl = domainMap[store];
  const list = toFallbackList(query);

  return list.map((item, index) => ({
    sourceId: `${store}-${query.trim().toLowerCase()}-${index}`,
    name: item.name,
    brand: item.brand,
    category: query.trim(),
    price: Number(item.price),
    currency: 'ZAR',
    unit: item.unit,
    imageUrl: undefined,
    productUrl: item.productUrl ?? `${baseUrl}search?q=${encodeURIComponent(query)}`,
    inStock: true,
  }));
}
