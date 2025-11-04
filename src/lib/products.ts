import { supabase } from './supabaseClient';
import { Product, ProductVariant } from '@/app/types/Product';

// Database types (matching snake_case from Supabase)
interface ProductRow {
  id: string;
  name: string;
  description: string;
  base_price: number;
  images: string[];
  category: string;
  tags: string[];
  featured: boolean;
  created_at: string;
  updated_at: string;
}

interface ProductVariantRow {
  id: string;
  product_id: string;
  size: string;
  color: string;
  sku: string;
  price: number;
  inventory: number;
  images: string[];
  created_at: string;
  updated_at: string;
}

// Convert database row to Product type
function mapProductRow(row: ProductRow, variants: ProductVariantRow[]): Product {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    basePrice: row.base_price,
    images: row.images,
    category: row.category,
    tags: row.tags,
    featured: row.featured,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    variants: variants.map(mapVariantRow)
  };
}

// Convert database row to ProductVariant type
function mapVariantRow(row: ProductVariantRow): ProductVariant {
  return {
    id: row.id,
    size: row.size,
    color: row.color,
    sku: row.sku,
    price: row.price,
    inventory: row.inventory,
    images: row.images
  };
}

/**
 * Fetch all products with their variants
 */
export async function getAllProducts(): Promise<Product[]> {
  try {
    // Fetch products
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (productsError) {
      console.error('Error fetching products:', productsError);
      return [];
    }

    if (!products || products.length === 0) {
      return [];
    }

    // Fetch all variants
    const { data: variants, error: variantsError } = await supabase
      .from('product_variants')
      .select('*');

    if (variantsError) {
      console.error('Error fetching variants:', variantsError);
      return [];
    }

    // Map products with their variants
    return products.map((product: ProductRow) => {
      const productVariants = variants?.filter(
        (v: ProductVariantRow) => v.product_id === product.id
      ) || [];
      return mapProductRow(product, productVariants);
    });
  } catch (error) {
    console.error('Error in getAllProducts:', error);
    return [];
  }
}

/**
 * Fetch featured products with their variants
 */
export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false });

    if (productsError) {
      console.error('Error fetching featured products:', productsError);
      return [];
    }

    if (!products || products.length === 0) {
      return [];
    }

    const productIds = products.map((p: ProductRow) => p.id);
    const { data: variants, error: variantsError } = await supabase
      .from('product_variants')
      .select('*')
      .in('product_id', productIds);

    if (variantsError) {
      console.error('Error fetching variants:', variantsError);
      return [];
    }

    return products.map((product: ProductRow) => {
      const productVariants = variants?.filter(
        (v: ProductVariantRow) => v.product_id === product.id
      ) || [];
      return mapProductRow(product, productVariants);
    });
  } catch (error) {
    console.error('Error in getFeaturedProducts:', error);
    return [];
  }
}

/**
 * Fetch a single product by ID with its variants
 */
export async function getProductById(id: string): Promise<Product | null> {
  try {
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (productError) {
      console.error('Error fetching product:', productError);
      return null;
    }

    if (!product) {
      return null;
    }

    const { data: variants, error: variantsError } = await supabase
      .from('product_variants')
      .select('*')
      .eq('product_id', id);

    if (variantsError) {
      console.error('Error fetching variants:', variantsError);
      return null;
    }

    return mapProductRow(product, variants || []);
  } catch (error) {
    console.error('Error in getProductById:', error);
    return null;
  }
}

/**
 * Fetch a single product by name with its variants
 */
export async function getProductByName(name: string): Promise<Product | null> {
  try {
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('*')
      .eq('name', name)
      .single();

    if (productError) {
      console.error('Error fetching product:', productError);
      return null;
    }

    if (!product) {
      return null;
    }

    const { data: variants, error: variantsError } = await supabase
      .from('product_variants')
      .select('*')
      .eq('product_id', product.id);

    if (variantsError) {
      console.error('Error fetching variants:', variantsError);
      return null;
    }

    return mapProductRow(product, variants || []);
  } catch (error) {
    console.error('Error in getProductByName:', error);
    return null;
  }
}

/**
 * Fetch a single product by handle (URL slug) with its variants
 * Handle is the product name converted to lowercase with spaces replaced by hyphens
 * e.g., "D1 Essential Tee" -> "d1-essential-tee"
 */
export async function getProductByHandle(handle: string): Promise<Product | null> {
  try {
    // Fetch all products and find the one matching the handle
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('*');

    if (productsError) {
      console.error('Error fetching products:', productsError);
      return null;
    }

    if (!products || products.length === 0) {
      return null;
    }

    // Find product where the name converted to handle format matches the given handle
    const product = products.find((p: ProductRow) => 
      p.name.toLowerCase().replace(/\s+/g, '-') === handle
    );

    if (!product) {
      return null;
    }

    // Fetch variants for the found product
    const { data: variants, error: variantsError } = await supabase
      .from('product_variants')
      .select('*')
      .eq('product_id', product.id);

    if (variantsError) {
      console.error('Error fetching variants:', variantsError);
      return null;
    }

    return mapProductRow(product, variants || []);
  } catch (error) {
    console.error('Error in getProductByHandle:', error);
    return null;
  }
}

/**
 * Fetch variants for a specific product and color
 */
export async function getProductVariantsByColor(productId: string, color: string): Promise<ProductVariant[]> {
  try {
    const { data: variants, error } = await supabase
      .from('product_variants')
      .select('*')
      .eq('product_id', productId)
      .eq('color', color);

    if (error) {
      console.error('Error fetching variants by color:', error);
      return [];
    }

    return variants?.map(mapVariantRow) || [];
  } catch (error) {
    console.error('Error in getProductVariantsByColor:', error);
    return [];
  }
}

/**
 * Get unique colors available for a product
 */
export async function getProductColors(productId: string): Promise<string[]> {
  try {
    const { data: variants, error } = await supabase
      .from('product_variants')
      .select('color')
      .eq('product_id', productId);

    if (error) {
      console.error('Error fetching product colors:', error);
      return [];
    }

    // Get unique colors
    const colors = [...new Set(variants?.map((v: { color: string }) => v.color) || [])];
    return colors;
  } catch (error) {
    console.error('Error in getProductColors:', error);
    return [];
  }
}

/**
 * Get unique sizes available for a product and color combination
 */
export async function getProductSizes(productId: string, color: string): Promise<string[]> {
  try {
    const { data: variants, error } = await supabase
      .from('product_variants')
      .select('size')
      .eq('product_id', productId)
      .eq('color', color);

    if (error) {
      console.error('Error fetching product sizes:', error);
      return [];
    }

    return variants?.map((v: { size: string }) => v.size) || [];
  } catch (error) {
    console.error('Error in getProductSizes:', error);
    return [];
  }
}
