import { X, Plus, Minus } from 'lucide-react';
import Image from 'next/image';
export const CartDrawer = () => {
  // const { state, removeItem, updateQuantity, getCartTotal, getCartItemsCount, openCart, closeCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
      <div>
          <Image
              src={'/images/logo-alt-white.png'}
              alt="Built To Last"
              width={100}
              height={20}

              />
      </div>
    // <Sheet open={state.isOpen} onOpenChange={(open) => (open ? openCart() : closeCart())}>
    //   <SheetTrigger asChild>
    //     <Button variant="ghost" className="relative">
    //       <BTLCartIcon className="h-12 w-24" />
    //       {getCartItemsCount() > 0 && (
    //         <span className="absolute -top-2 -right-2 bg-brand-charcoal text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
    //           {getCartItemsCount()}
    //         </span>
    //       )}
    //     </Button>
    //   </SheetTrigger>
    //   <SheetContent side="right" className="w-full max-w-lg animate-slide-in-right">
    //     <SheetHeader>
    //       <SheetTitle>Shopping Cart</SheetTitle>
    //       <SheetDescription>
    //         {getCartItemsCount()} {getCartItemsCount() === 1 ? 'item' : 'items'} in your cart
    //       </SheetDescription>
    //     </SheetHeader>
    //
    //     <div className="mt-6 flex-1 overflow-y-auto">
    //       {state.items.length === 0 ? (
    //         <div className="text-center py-8">
    //           <BTLCartIcon className="mx-auto h-32 w-56 text-gray-400" />
    //           <p className="mt-4 text-sm text-gray-500">Your cart is empty</p>
    //         </div>
    //       ) : (
    //         <div className="space-y-4">
    //           {state.items.map((item) => (
    //             <div key={item.id} className="flex items-center space-x-4 border-b pb-4">
    //               <img
    //                 src={item.variant.images[0]}
    //                 alt={item.product.name}
    //                 className="h-16 w-16 object-cover rounded"
    //               />
    //               <div className="flex-1">
    //                 <h3 className="text-sm font-medium truncate">{item.product.name}</h3>
    //                 <p className="text-xs text-gray-500">
    //                   {item.variant.color} • {item.variant.size}
    //                 </p>
    //                 <p className="text-sm font-medium">{formatPrice(item.variant.price)}</p>
    //               </div>
    //               <div className="flex items-center space-x-2">
    //                 <Button
    //                   variant="outline"
    //                   size="icon"
    //                   className="h-8 w-8"
    //                   onClick={() => updateQuantity(item.id, item.quantity - 1)}
    //                 >
    //                   <Minus className="h-3 w-3" />
    //                 </Button>
    //                 <span className="text-sm w-8 text-center">{item.quantity}</span>
    //                 <Button
    //                   variant="outline"
    //                   size="icon"
    //                   className="h-8 w-8"
    //                   onClick={() => updateQuantity(item.id, item.quantity + 1)}
    //                 >
    //                   <Plus className="h-3 w-3" />
    //                 </Button>
    //               </div>
    //               <Button
    //                 variant="ghost"
    //                 size="icon"
    //                 className="h-8 w-8"
    //                 onClick={() => removeItem(item.id)}
    //               >
    //                 <X className="h-3 w-3" />
    //               </Button>
    //             </div>
    //           ))}
    //         </div>
    //       )}
    //     </div>
    //
    //     {state.items.length > 0 && (
    //       <div className="mt-6 border-t pt-6">
    //         <div className="flex justify-between text-base font-medium">
    //           <p>Subtotal</p>
    //           <p>{formatPrice(getCartTotal())}</p>
    //         </div>
    //         <p className="mt-0.5 text-sm text-gray-500">
    //           Shipping and taxes calculated at checkout.
    //         </p>
    //         <div className="mt-6">
    //           <Button
    //             className="w-full hover-scale"
    //             onClick={() => {
    //               closeCart();
    //               window.location.href = '/checkout';
    //             }}
    //           >
    //             Checkout
    //           </Button>
    //         </div>
    //         <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
    //           <p>
    //             or{' '}
    //             <button
    //               type="button"
    //               className="font-medium text-brand-charcoal hover:text-brand-charcoal/80"
    //               onClick={closeCart}
    //             >
    //               Continue Shopping
    //               <span aria-hidden="true"> &rarr;</span>
    //             </button>
    //           </p>
    //         </div>
    //       </div>
    //     )}
    //   </SheetContent>
    // </Sheet>
  );
};