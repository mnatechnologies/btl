export default function ReturnsPage() {
  return (
    <section className="mx-auto mt-6 w-[95vw] sm:w-[90vw] lg:w-[85vw] xl:w-[80vw] 2xl:w-[75vw] px-4 py-10">
      <header className="mb-8 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white">Returns & Refunds</h1>
        <p className="mt-3 text-sm sm:text-base text-white/80 max-w-3xl mx-auto">
          How returns, exchanges and refunds work at Built To Last.
        </p>
      </header>

      <article className="text-white/90 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-white">Policy Overview</h2>
          <p className="mt-3 text-white/80 whitespace-pre-line">
We accept returns for “change of mind” which will be returned in exchange for in-store or online store credit. Unfortunately, we cannot accept returns on sale items or gift cards. To be eligible for a return, your item must be in the same condition that you received it—unworn or unused, with tags, and in its original packaging. You’ll also need the receipt or proof of purchase.

To start a return, please email a photograph of the product and your order details to info@btlclothing.au so our team can review your request. If your return is accepted, we’ll send you a return shipping label along with instructions on how and where to send your package. Items sent back to us without first requesting a return will not be accepted.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white">Refunds</h2>
          <p className="mt-3 text-white/80 whitespace-pre-line">
Full refunds are only offered on defective or faulty items and must be returned to the same card used to purchase the original item.

We will notify you once we’ve received and inspected your return and let you know if the refund was approved. If approved, you’ll be automatically refunded on your original payment method within 10 business days. Please remember it can take some time for your bank or credit card company to process and post the refund. If more than 15 business days have passed since we’ve approved your return, please contact us at info@btlclothing.au.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white">Damages and Issues</h2>
          <p className="mt-3 text-white/80">
            Please inspect your order upon reception and contact us immediately if the item is defective, damaged or if you receive the wrong item, so that we can evaluate the issue and make it right.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white">Exchanges</h2>
          <p className="mt-3 text-white/80">
            The fastest way to ensure you get what you want is to return the item you have, and once the return is accepted, make a separate purchase for the new item.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white">EU 14-Day Cooling Off Period</h2>
          <p className="mt-3 text-white/80 whitespace-pre-line">
If the merchandise is being shipped into the European Union, you have the right to cancel or return your order within 14 days, for any reason and without a justification. As above, your item must be in the same condition that you received it—unworn or unused, with tags, and in its original packaging. You’ll also need the receipt or proof of purchase.
          </p>
        </section>
      </article>
    </section>
  );
}