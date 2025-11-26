// import Grid from '@/components/grid';
// import {GridTileImage} from '@/components/grid/tile';
// import Link from 'next/link';
// import {useState} from "react";
//
// export default function ProductGridItems({  }) {
//   const [selectedColor, setSelectedColor] = useState("Black");
//   const [selectedSize, setSelectedSize] = useState("");
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//
//   const colors = [
//     { name: "Black", value: "bg-black", available: true },
//     { name: "White", value: "bg-white border border-border", available: true },
//     { name: "Grey", value: "bg-brand-grey", available: true },
//     { name: "Off-White", value: "bg-stone border border-border", available: true },
//   ];
//
//   const sizes = ["XXS", "XS", "S", "M", "L", "XL"];
//
//   const getProductImages = () => {
//     switch (selectedColor) {
//       case "White":
//         return [
//           "/images/white-tshirt-front-flat.jpg",
//           "/images/white-tshirt-back-flat.jpg",
//           "/images/white-tshirt-front-flat.jpg",
//           "/images/white-tshirt-back-flat.jpg"
//         ];
//       case "Grey":
//         return [
//           "/images/grey-tshirt-front-flat.jpg",
//           "/images/grey-tshirt-back-full.jpg",
//           "/images/grey-tshirt-back-flat.jpg",
//           "/images/grey-tshirt-front-flat.jpg"
//         ];
//       case "Off-White":
//         return [
//           "/images/offwhite-tshirt-front-flat-new.jpg",
//           "/images/offwhite-tshirt-back-flat-photo4.jpg",
//           "/images/offwhite-tshirt-back-flat-new.jpg",
//           "/images/offwhite-tshirt-detail1.jpg",
//           "/images/offwhite-tshirt-detail2.jpg",
//           "/images/offwhite-tshirt-detail3.jpg",
//           "/images/offwhite-tshirt-detail4.jpg"
//         ];
//       default: // Black
//         return [
//           "/images/black-tshirt-front-flat.jpg",
//           "/images/black-tshirt-back-flat.jpg",
//           "/images/black-tshirt-front-flat.jpg",
//           "/images/black-tshirt-back-flat.jpg"
//         ];
//     }
//   };
//   const currentImages = getProductImages();
//
//   const product = {
//     id: "btl-essential-tee",
//     name: "Essential Tee",
//     description: "Premium organic cotton t-shirt designed for comfort and durability",
//     basePrice: 220.00,
//     images: currentImages,
//     variants: [],
//     category: "T-Shirts",
//     tags: ["organic", "cotton", "sustainable"],
//     featured: true,
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//   };
//
//   const variant = {
//     id: `${product.id}-${selectedColor.toLowerCase()}-${selectedSize.toLowerCase()}`,
//     size: selectedSize,
//     color: selectedColor,
//     sku: `BTL-TEE-${selectedColor.toUpperCase()}-${selectedSize}`,
//     price: 220.00,
//     inventory: 50,
//     images: currentImages,
//   };
// };
//   return (
//     <>
//
//         <Grid.Item m key={product} className="animate-fadeIn">
//           <Link
//             className="relative inline-block h-full w-full"
//             href={`/product/${product}`}
//             prefetch={true}
//           >
//             <GridTileImage
//               alt={product.name}
//               label={{
//                 title: product.title,
//                 amount: product.priceRange.maxVariantPrice.amount,
//                 currencyCode: product.priceRange.maxVariantPrice.currencyCode
//               }}
//               src={product.featuredImage?.url}
//               fill
//               sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
//             />
//           </Link>
//         </Grid.Item>
//     </>
//   );
// }
