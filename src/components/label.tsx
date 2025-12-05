import clsx from 'clsx';
import Price from './price';

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
  // Adjust padding based on size
  const containerPadding = position === 'bottom'
    ? (size === 'large' ? 'px-[2%] pb-[2%]' : 'px-[3%] pb-[3%]')
    : 'px-[3%] pb-[5%] lg:px-20 lg:pb-[35%]';

  // Adjust text size and inner padding based on size
  const innerPadding = size === 'large'
    ? 'px-2 py-1.5 sm:px-3 sm:py-2'
    : 'px-1.5 py-1 sm:px-2 sm:py-1.5';

  const textSize = size === 'large'
    ? 'text-[10px] xs:text-xs sm:text-sm'
    : 'text-[9px] xs:text-[10px] sm:text-xs';

  return (
    <div
      className={clsx('absolute bottom-0 left-0 flex w-full @container/label', containerPadding)}
    >
      <div className={clsx(
        'flex items-center rounded-lg border border-neutral-200 bg-white/70 font-semibold text-neutral-900 backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-neutral-100',
        innerPadding,
        textSize
      )}>
        <h3 className="mr-2 grow leading-tight tracking-tight">{title}</h3>
        <Price
          className="flex-none rounded-full bg-neutral-900 px-2 py-1 text-white dark:bg-neutral-100 dark:text-black"
          amount={amount}
          currencyCode={currencyCode}
          currencyCodeClassName="hidden @[275px]/label:inline"
        />
      </div>
    </div>
  );
};

export default Label;
