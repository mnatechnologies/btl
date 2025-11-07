import clsx from 'clsx';
import Price from './price';

const Label = ({
  title,
  amount,
  currencyCode,
  position = 'bottom'
}: {
  title: string;
  amount: string;
  currencyCode: string;
  position?: 'bottom' | 'center';
}) => {
  return (
    <div
    className={clsx('absolute bottom-0 left-0 flex w-full @container/label', {
      'px-[2%] pb-[2%]': position === 'bottom',
      'px-[3%] pb-[5%] lg:px-20 lg:pb-[35%]': position === 'center'
    })}
    >
    <div className="flex items-center rounded-full border border-neutral-200 bg-white/70 p-[1%] text-[clamp(0.625rem,2vw,0.75rem)] font-semibold text-neutral-900 backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-neutral-100">
      <h3 className="mr-[2%] line-clamp-2 grow pl-[1%] leading-none tracking-tight">{title}</h3>
        <Price
          className="flex-none rounded-full bg-neutral-900 p-[1.5%] text-white dark:bg-neutral-100 dark:text-black"
          amount={amount}
          currencyCode={currencyCode}
          currencyCodeClassName="hidden @[275px]/label:inline"
        />
      </div>
    </div>
  );
};

export default Label;
