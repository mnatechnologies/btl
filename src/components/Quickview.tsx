'use client'
import { useState, useEffect } from 'react';
import { getProductVariantsByColor } from '@/lib/products';

export function QuickView({ productId, selectedColor }) {
    const [variants, setVariants] = useState([]);

    useEffect(() => {
        async function loadVariants() {
            // Only fetch variants for the selected color, not all product data
            const colorVariants = await getProductVariantsByColor(productId, selectedColor);
            setVariants(colorVariants);
        loadVariants();
    }, [productId, selectedColor]);

    return (
        <div className="quick-view">
            <h3>Available Sizes for {selectedColor}</h3>
            <div className="sizes">
                {variants.map(v => (
                    <button key={v.id}>{v.size} - ${v.price}</button>
                ))}
            </div>
        </div>
    );
})
}