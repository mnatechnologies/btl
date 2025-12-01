export interface ProductVariant {
    id: string;
    size: string;
    color: string;
    sku: string;
    price: number;
    inventory: number;
    images: string[];
}

export interface Product {
    id: string;
    name: string;
    description: string;
    basePrice: number;
    images: string[];
    variants: ProductVariant[];
    category: string;
    tags: string[];
    featured: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CartItem {
    id: string;
    productId: string;
    variantId: string;
    quantity: number;
    product: Product;
    variant: ProductVariant;
}

export interface Category {
    id: string;
    name: string;
    slug: string;
    description?: string;
    image?: string;
}

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    addresses: Address[];
}

export interface Address {
    id: string;
    firstName: string;
    lastName: string;
    company?: string;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone?: string;
    isDefault: boolean;
}

export interface Order {
    id: string;
    userId: string;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    items: CartItem[];
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
    shippingAddress: Address;
    billingAddress: Address;
    createdAt: string;
    updatedAt: string;
}