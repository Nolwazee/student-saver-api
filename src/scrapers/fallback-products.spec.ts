import assert from 'node:assert/strict';
import { buildFallbackProducts } from './fallback-products';

const products = buildFallbackProducts('shoprite', 'banana');
assert.ok(products.length >= 2, 'fallback should return multiple product rows for a search term');
assert.ok(products.every((product) => typeof product.imageUrl === 'string' && product.imageUrl.length > 0), 'every fallback product should include an image URL');
console.log(`verified ${products.length} fallback products with images`);
