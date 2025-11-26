// import { X } from "lucide-react";
// import { useState } from "react";
// import bannerTexture from 'public/images/banner-texture.jpg'
//
// const TopBanner = () => {
//   const [isVisible, setIsVisible] = useState(true);
//
//   if (!isVisible) return null;
//
//   return (
//     <div className="relative w-full h-20 overflow-hidden">
//       {/* Background Image */}
//       <div
//         className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//         style={{ backgroundImage: `url(${bannerTexture})` }}
//       >
//         <div className="absolute inset-0 bg-brand-charcoal/80"></div>
//       </div>
//
//       {/* Content */}
//       <div className="relative z-10 flex items-center justify-center h-full px-4">
//         <div className="text-center">
//           <p className="text-primary-foreground text-sm font-medium uppercase tracking-wider">
//             New Collection Available
//           </p>
//           <p className="text-primary-foreground/80 text-xs mt-1">
//             Order 2 more shirts and unlock free shipping
//           </p>
//         </div>
//
//         {/* Close Button */}
//         <button
//           onClick={() => setIsVisible(false)}
//           className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-foreground/60 hover:text-primary-foreground transition-colors"
//           aria-label="Close banner"
//         >
//           <X className="h-4 w-4" />
//         </button>
//       </div>
//     </div>
//   );
// };
//
// export default TopBanner;