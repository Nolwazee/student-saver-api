import { StoreName } from '../products/entities/product.entity';
import { ScrapedProduct } from './scraper.interface';

const PRODUCT_CATALOG: Record<string, Array<{ name: string; price: number; unit?: string; brand?: string; productUrl?: string; imageUrl?: string }>> = {
  milk: [
    { name: 'Full Cream Milk 1L', price: 21.99, unit: '1L', brand: 'Fresh', productUrl: 'https://www.shoprite.co.za/', imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=900&q=80' },
    { name: 'Fresh Milk 2L', price: 34.99, unit: '2L', brand: 'Farm Fresh', productUrl: 'https://www.checkers.co.za/', imageUrl: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=900&q=80' },
    { name: 'Milk 1L', price: 24.5, unit: '1L', brand: 'Dairy Best', productUrl: 'https://foodloversmarket.co.za/', imageUrl: 'https://images.unsplash.com/photo-1570585429632-5395d7d91ac7?auto=format&fit=crop&w=900&q=80' },
    { name: 'Long Life Milk 1L', price: 23.49, unit: '1L', brand: 'Value', productUrl: 'https://www.pnp.co.za/', imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=900&q=80' },
  ],
  bread: [
    { name: 'Brown Bread Loaf', price: 16.99, unit: 'loaf', brand: 'Bakery', productUrl: 'https://www.shoprite.co.za/', imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80' },
    { name: 'White Bread Loaf', price: 17.49, unit: 'loaf', brand: 'Baker', productUrl: 'https://www.checkers.co.za/', imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80' },
    { name: 'Sourdough Bread', price: 29.99, unit: 'loaf', brand: 'Artisan', productUrl: 'https://foodloversmarket.co.za/', imageUrl: 'https://images.unsplash.com/photo-1549931314-a545dcf3bc73?auto=format&fit=crop&w=900&q=80' },
  ],
  eggs: [
    { name: 'Large Eggs 18 Pack', price: 41.99, unit: '18 pack', brand: 'Farm Value', productUrl: 'https://www.shoprite.co.za/', imageUrl: 'https://images.unsplash.com/photo-1518492104633-130d0cc8559c?auto=format&fit=crop&w=900&q=80' },
    { name: 'Free Range Eggs 6 Pack', price: 31.99, unit: '6 pack', brand: 'Organic', productUrl: 'https://www.checkers.co.za/', imageUrl: 'https://images.unsplash.com/photo-1506975094-3d2d3d6f9d8a?auto=format&fit=crop&w=900&q=80' },
  ],
  rice: [
    { name: 'White Rice 5kg', price: 59.99, unit: '5kg', brand: 'House Brand', productUrl: 'https://www.shoprite.co.za/', imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31e?auto=format&fit=crop&w=900&q=80' },
    { name: 'Long Grain Rice 2kg', price: 39.99, unit: '2kg', brand: 'Cookwell', productUrl: 'https://www.pnp.co.za/', imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31e?auto=format&fit=crop&w=900&q=80' },
  ],
  'maize meal': [
    { name: 'Maize Meal 5kg', price: 54.99, unit: '5kg', brand: 'Mabele', productUrl: 'https://www.shoprite.co.za/', imageUrl: 'https://images.unsplash.com/photo-1604908554004-66f6b1f1f0a1?auto=format&fit=crop&w=900&q=80' },
    { name: 'Super Maize Meal 5kg', price: 57.99, unit: '5kg', brand: 'Pride', productUrl: 'https://www.checkers.co.za/', imageUrl: 'https://images.unsplash.com/photo-1604908554004-66f6b1f1f0a1?auto=format&fit=crop&w=900&q=80' },
  ],
  sugar: [
    { name: 'Sugar 2kg', price: 28.99, unit: '2kg', brand: 'Sweet', productUrl: 'https://www.shoprite.co.za/', imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80' },
    { name: 'Castor Sugar 1kg', price: 22.49, unit: '1kg', brand: 'Baker', productUrl: 'https://www.pnp.co.za/', imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80' },
  ],
  'cooking oil': [
    { name: 'Cooking Oil 2L', price: 69.99, unit: '2L', brand: 'SunGold', productUrl: 'https://www.shoprite.co.za/', imageUrl: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=900&q=80' },
    { name: 'Canola Oil 1L', price: 53.99, unit: '1L', brand: 'Pure', productUrl: 'https://www.checkers.co.za/', imageUrl: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=900&q=80' },
  ],
  chicken: [
    { name: 'Chicken Portions 1kg', price: 62.99, unit: '1kg', brand: 'Fresh Cuts', productUrl: 'https://www.shoprite.co.za/', imageUrl: 'https://images.unsplash.com/photo-1607623814075-e51df1b7c4d4?auto=format&fit=crop&w=900&q=80' },
    { name: 'Chicken Thighs 1kg', price: 68.5, unit: '1kg', brand: 'Butcher', productUrl: 'https://foodloversmarket.co.za/', imageUrl: 'https://images.unsplash.com/photo-1607623814075-e51df1b7c4d4?auto=format&fit=crop&w=900&q=80' },
  ],
  'beef mince': [
    { name: 'Beef Mince 500g', price: 58.99, unit: '500g', brand: 'Prime', productUrl: 'https://foodloversmarket.co.za/', imageUrl: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=900&q=80' },
    { name: 'Lean Beef Mince 500g', price: 66.99, unit: '500g', brand: 'Fresh Cut', productUrl: 'https://www.checkers.co.za/', imageUrl: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=900&q=80' },
  ],
  potatoes: [
    { name: 'Potatoes 2kg', price: 25.99, unit: '2kg', brand: 'Farm', productUrl: 'https://www.shoprite.co.za/', imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=900&q=80' },
    { name: 'Potatoes 5kg', price: 41.99, unit: '5kg', brand: 'Value', productUrl: 'https://foodloversmarket.co.za/', imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=900&q=80' },
  ],
  onions: [
    { name: 'Onions 1kg', price: 18.99, unit: '1kg', brand: 'Fresh Market', productUrl: 'https://www.shoprite.co.za/', imageUrl: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=900&q=80' },
    { name: 'Red Onions 500g', price: 15.49, unit: '500g', brand: 'Premium', productUrl: 'https://www.checkers.co.za/', imageUrl: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=900&q=80' },
  ],
  tomatoes: [
    { name: 'Tomatoes 1kg', price: 21.99, unit: '1kg', brand: 'Garden', productUrl: 'https://www.shoprite.co.za/', imageUrl: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=900&q=80' },
    { name: 'Cherry Tomatoes 250g', price: 18.99, unit: '250g', brand: 'Fresh', productUrl: 'https://foodloversmarket.co.za/', imageUrl: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=900&q=80' },
  ],
  butter: [
    { name: 'Butter 500g', price: 49.99, unit: '500g', brand: 'Dairy Co', productUrl: 'https://www.shoprite.co.za/', imageUrl: 'https://images.unsplash.com/photo-1657299156255-1beef7bc6cc7?auto=format&fit=crop&w=900&q=80' },
    { name: 'Salted Butter 250g', price: 34.99, unit: '250g', brand: 'Farm Gold', productUrl: 'https://www.checkers.co.za/', imageUrl: 'https://images.unsplash.com/photo-1657299156255-1beef7bc6cc7?auto=format&fit=crop&w=900&q=80' },
  ],
  cheese: [
    { name: 'Cheddar Cheese 500g', price: 54.99, unit: '500g', brand: 'Creamy', productUrl: 'https://www.shoprite.co.za/', imageUrl: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=900&q=80' },
    { name: 'Cheese Block 1kg', price: 88.99, unit: '1kg', brand: 'Deli', productUrl: 'https://foodloversmarket.co.za/', imageUrl: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=900&q=80' },
  ],
  yoghurt: [
    { name: 'Yoghurt 1kg', price: 44.99, unit: '1kg', brand: 'Dairy Fresh', productUrl: 'https://www.shoprite.co.za/', imageUrl: 'https://images.unsplash.com/photo-1571212515416-9b6b6c9c98c0?auto=format&fit=crop&w=900&q=80' },
    { name: 'Greek Yoghurt 500g', price: 39.5, unit: '500g', brand: 'Pure', productUrl: 'https://www.checkers.co.za/', imageUrl: 'https://images.unsplash.com/photo-1571212515416-9b6b6c9c98c0?auto=format&fit=crop&w=900&q=80' },
  ],
  cereal: [
    { name: 'Breakfast Cereal 750g', price: 39.99, unit: '750g', brand: 'Morning Crisp', productUrl: 'https://www.shoprite.co.za/', imageUrl: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&w=900&q=80' },
    { name: 'Whole Wheat Cereal 500g', price: 33.49, unit: '500g', brand: 'Health', productUrl: 'https://www.pnp.co.za/', imageUrl: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&w=900&q=80' },
  ],
  tea: [
    { name: 'Tea Bags 50 Pack', price: 29.99, unit: '50 pack', brand: 'Family', productUrl: 'https://www.shoprite.co.za/', imageUrl: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=900&q=80' },
    { name: 'Herbal Tea 20 Pack', price: 33.99, unit: '20 pack', brand: 'Nature', productUrl: 'https://www.checkers.co.za/', imageUrl: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=900&q=80' },
  ],
  coffee: [
    { name: 'Ground Coffee 250g', price: 52.99, unit: '250g', brand: 'Roasted', productUrl: 'https://www.shoprite.co.za/', imageUrl: 'https://images.unsplash.com/photo-1498804103079-a4f47e4f0b2e?auto=format&fit=crop&w=900&q=80' },
    { name: 'Espresso Coffee 250g', price: 59.99, unit: '250g', brand: 'Brew', productUrl: 'https://foodloversmarket.co.za/', imageUrl: 'https://images.unsplash.com/photo-1498804103079-a4f47e4f0b2e?auto=format&fit=crop&w=900&q=80' },
  ],
  'toilet paper': [
    { name: 'Toilet Paper 12 Roll', price: 64.99, unit: '12 roll', brand: 'Soft', productUrl: 'https://www.shoprite.co.za/', imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80' },
    { name: 'Toilet Paper 4 Roll', price: 27.99, unit: '4 roll', brand: 'Home', productUrl: 'https://www.checkers.co.za/', imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80' },
  ],
  'washing powder': [
    { name: 'Washing Powder 2kg', price: 69.99, unit: '2kg', brand: 'Clean', productUrl: 'https://www.shoprite.co.za/', imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80' },
    { name: 'Laundry Powder 1kg', price: 54.99, unit: '1kg', brand: 'Bright', productUrl: 'https://www.checkers.co.za/', imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80' },
  ],
  apples: [
    { name: 'Red Apples 1kg', price: 32.99, unit: '1kg', brand: 'Fresh Harvest', productUrl: 'https://www.shoprite.co.za/', imageUrl: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=900&q=80' },
    { name: 'Royal Gala Apples 1kg', price: 35.99, unit: '1kg', brand: 'Premium', productUrl: 'https://www.checkers.co.za/', imageUrl: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=900&q=80' },
  ],
  bananas: [
    { name: 'Bananas 1kg', price: 23.99, unit: '1kg', brand: 'Fresh Pick', productUrl: 'https://foodloversmarket.co.za/', imageUrl: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=900&q=80' },
    { name: 'Banana Bunch', price: 24.5, unit: 'bunch', brand: 'Sunrise', productUrl: 'https://www.pnp.co.za/', imageUrl: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=900&q=80' },
  ],
  oranges: [
    { name: 'Oranges 1kg', price: 26.99, unit: '1kg', brand: 'Citrus', productUrl: 'https://www.shoprite.co.za/', imageUrl: 'https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=900&q=80' },
    { name: 'Navel Oranges 1kg', price: 29.99, unit: '1kg', brand: 'Garden Fresh', productUrl: 'https://www.checkers.co.za/', imageUrl: 'https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=900&q=80' },
  ],
  carrots: [
    { name: 'Carrots 1kg', price: 18.99, unit: '1kg', brand: 'Farm Fresh', productUrl: 'https://foodloversmarket.co.za/', imageUrl: 'https://images.unsplash.com/photo-1447175008436-054170c2e979?auto=format&fit=crop&w=900&q=80' },
    { name: 'Baby Carrots 500g', price: 13.99, unit: '500g', brand: 'Garden', productUrl: 'https://www.shoprite.co.za/', imageUrl: 'https://images.unsplash.com/photo-1447175008436-054170c2e979?auto=format&fit=crop&w=900&q=80' },
  ],
  lettuce: [
    { name: 'Romaine Lettuce', price: 19.99, unit: 'each', brand: 'Fresh', productUrl: 'https://www.shoprite.co.za/', imageUrl: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?auto=format&fit=crop&w=900&q=80' },
    { name: 'Green Salad Lettuce', price: 17.99, unit: 'each', brand: 'Garden', productUrl: 'https://foodloversmarket.co.za/', imageUrl: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?auto=format&fit=crop&w=900&q=80' },
  ],
  spinach: [
    { name: 'Spinach 200g', price: 15.99, unit: '200g', brand: 'Leafy', productUrl: 'https://www.checkers.co.za/', imageUrl: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=900&q=80' },
    { name: 'Baby Spinach 150g', price: 14.99, unit: '150g', brand: 'Fresh Greens', productUrl: 'https://www.shoprite.co.za/', imageUrl: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=900&q=80' },
  ],
  oats: [
    { name: 'Rolled Oats 1kg', price: 24.99, unit: '1kg', brand: 'Daily', productUrl: 'https://www.shoprite.co.za/', imageUrl: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&w=900&q=80' },
    { name: 'Oat Bran 500g', price: 22.49, unit: '500g', brand: 'Health', productUrl: 'https://www.pnp.co.za/', imageUrl: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&w=900&q=80' },
  ],
  pasta: [
    { name: 'Spaghetti 500g', price: 18.99, unit: '500g', brand: 'Classic', productUrl: 'https://www.shoprite.co.za/', imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=900&q=80' },
    { name: 'Pasta 1kg', price: 29.99, unit: '1kg', brand: 'Family', productUrl: 'https://www.checkers.co.za/', imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=900&q=80' },
  ],
  flour: [
    { name: 'Cake Flour 2kg', price: 31.99, unit: '2kg', brand: 'Bake', productUrl: 'https://www.shoprite.co.za/', imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31e?auto=format&fit=crop&w=900&q=80' },
    { name: 'White Flour 2kg', price: 27.99, unit: '2kg', brand: 'Kitchen', productUrl: 'https://www.checkers.co.za/', imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31e?auto=format&fit=crop&w=900&q=80' },
  ],
  'peanut butter': [
    { name: 'Peanut Butter 500g', price: 33.99, unit: '500g', brand: 'Crunchy', productUrl: 'https://www.shoprite.co.za/', imageUrl: 'https://images.unsplash.com/photo-1596507094674-6a1b2d0c1f8a?auto=format&fit=crop&w=900&q=80' },
    { name: 'Creamy Peanut Butter 750g', price: 38.99, unit: '750g', brand: 'Natural', productUrl: 'https://foodloversmarket.co.za/', imageUrl: 'https://images.unsplash.com/photo-1596507094674-6a1b2d0c1f8a?auto=format&fit=crop&w=900&q=80' },
  ],
  jam: [
    { name: 'Strawberry Jam 500g', price: 29.99, unit: '500g', brand: 'Berry Best', productUrl: 'https://www.checkers.co.za/', imageUrl: 'https://images.unsplash.com/photo-1568252945326-c10d0cb0f1d3?auto=format&fit=crop&w=900&q=80' },
    { name: 'Apricot Jam 500g', price: 31.99, unit: '500g', brand: 'Sunrise', productUrl: 'https://www.shoprite.co.za/', imageUrl: 'https://images.unsplash.com/photo-1568252945326-c10d0cb0f1d3?auto=format&fit=crop&w=900&q=80' },
  ],
  'soft drink': [
    { name: 'Cola 2L', price: 21.99, unit: '2L', brand: 'Fizz', productUrl: 'https://www.shoprite.co.za/', imageUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f2b7420e?auto=format&fit=crop&w=900&q=80' },
    { name: 'Orange Soda 2L', price: 23.49, unit: '2L', brand: 'Citrus', productUrl: 'https://www.checkers.co.za/', imageUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f2b7420e?auto=format&fit=crop&w=900&q=80' },
  ],
  water: [
    { name: 'Still Water 1.5L', price: 14.99, unit: '1.5L', brand: 'Pure', productUrl: 'https://www.shoprite.co.za/', imageUrl: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=900&q=80' },
    { name: 'Sparkling Water 1L', price: 18.99, unit: '1L', brand: 'Fresh Burst', productUrl: 'https://www.checkers.co.za/', imageUrl: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=900&q=80' },
  ],
  soap: [
    { name: 'Bar Soap 4 Pack', price: 29.99, unit: '4 pack', brand: 'Clean', productUrl: 'https://www.shoprite.co.za/', imageUrl: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80' },
    { name: 'Luxury Soap 3 Pack', price: 34.99, unit: '3 pack', brand: 'Fresh', productUrl: 'https://www.checkers.co.za/', imageUrl: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80' },
  ],
  shampoo: [
    { name: 'Shampoo 750ml', price: 49.99, unit: '750ml', brand: 'Hair Care', productUrl: 'https://www.shoprite.co.za/', imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80' },
    { name: 'Moisture Shampoo 500ml', price: 39.99, unit: '500ml', brand: 'Care Plus', productUrl: 'https://www.checkers.co.za/', imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80' },
  ],
  toothpaste: [
    { name: 'Toothpaste 100ml', price: 24.99, unit: '100ml', brand: 'Smile', productUrl: 'https://www.shoprite.co.za/', imageUrl: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=80' },
    { name: 'Whitening Toothpaste 120ml', price: 29.99, unit: '120ml', brand: 'Bright', productUrl: 'https://foodloversmarket.co.za/', imageUrl: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=80' },
  ],
  diapers: [
    { name: 'Baby Diapers Size 3', price: 119.99, unit: 'pack', brand: 'Little Love', productUrl: 'https://www.shoprite.co.za/', imageUrl: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=900&q=80' },
    { name: 'Diapers Size 4', price: 134.99, unit: 'pack', brand: 'Tender', productUrl: 'https://www.checkers.co.za/', imageUrl: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=900&q=80' },
  ],
};

const GENERIC_PRODUCT_IMAGE = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80';

function normalizeTerm(term: string) {
  return term.trim().toLowerCase().replace(/\s+/g, ' ');
}

function toFallbackList(term: string) {
  const normalized = normalizeTerm(term);
  const directMatches = Object.entries(PRODUCT_CATALOG)
    .filter(([key]) => key.includes(normalized) || normalized.includes(key))
    .map(([, items]) => items)
    .flat();

  if (directMatches.length > 0) {
    return directMatches.slice(0, 6);
  }

  const genericLabel = normalized.length > 0 ? normalized : 'product';
  return [
    { name: `${genericLabel.charAt(0).toUpperCase()}${genericLabel.slice(1)} Pack`, price: 19.99, unit: 'each', brand: 'Value', imageUrl: GENERIC_PRODUCT_IMAGE },
    { name: `${genericLabel.charAt(0).toUpperCase()}${genericLabel.slice(1)} Bundle`, price: 29.99, unit: 'pack', brand: 'Essential', imageUrl: GENERIC_PRODUCT_IMAGE },
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
    sourceId: `${store}-${normalizeTerm(query)}-${index}`,
    name: item.name,
    brand: item.brand,
    category: normalizeTerm(query) || 'general',
    price: Number(item.price),
    currency: 'ZAR',
    unit: item.unit,
    imageUrl: item.imageUrl ?? GENERIC_PRODUCT_IMAGE,
    productUrl: item.productUrl ?? `${baseUrl}search?q=${encodeURIComponent(query)}`,
    inStock: true,
  }));
}
