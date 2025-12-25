import clsx from 'clsx';
import Price from './price';
import { isSaleActive, getDiscountPercent } from '@/lib/saleConfig';


const Label = ({
  title,
  amount,
  currencyCode,
  position = 'bottom',
  size = 'large'
}: {
  title: string;
  amount?: string;
  currencyCode: string;
  position?: 'bottom' | 'center';
  size?: 'large' | 'small';
}) => {

  const saleActive = isSaleActive();
  const discountPercent = getDiscountPercent();

  const originalAmount = amount ? parseFloat(amount) : 0;
  const saleAmount = saleActive ? originalAmount * (1 - discountPercent / 100) : originalAmount;
  // Adjust padding based on size
  const containerPadding = position === 'bottom'
    ? (size === 'large' ? 'px-[2%] pb-[2%]' : 'px-[1%] pb-[1%]')
    : 'px-[2%] pb-[2%] lg:px-20 lg:pb-[35%]';

  // Adjust text size and inner padding based on size
  const innerPadding = size === 'large'
    ? 'px-2 py-1.5 sm:px-3 sm:py-2'
    : 'px-1 py-1 sm:px-4 sm:py-1.5';

  const textSize = size === 'large'
    ? 'text-[10px] xs:text-xs sm:text-sm'
    : 'text-[7px] xs:text-[10px] sm:text-xs';

  const maxWidth = size === 'large'
    ? 'max-w-[80%] sm:max-w-full'
    : 'max-w-full';


  return (
    <div
      className={clsx('absolute bottom-2 left-0 flex w-full @container/label', containerPadding)}
    >
      <div className={clsx(
        'flex items-center rounded-lg border border-neutral-200 bg-white/70 font-semibold text-neutral-900 backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-neutral-100',
        innerPadding,
        textSize,
        maxWidth
      )}>
        <h3 className="mr-2 grow leading-tight tracking-tight">{title}</h3>
        {amount && (
          <div className="flex items-center gap-1.5">
            {saleActive && (
              <span className="text-neutral-400 line-through text-sm">
                  ${originalAmount.toFixed(0)}
                </span>
            )}
            <Price
              className={clsx(
                'flex-none rounded-full px-2 py-1',
                saleActive
                  ? 'bg-black text-white'
                  : 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-black'
              )}
              amount={saleAmount.toFixed(2)}
              currencyCode={currencyCode}
              currencyCodeClassName="hidden @[275px]/label:inline"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Label;
