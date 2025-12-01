import clsx from 'clsx';
import Image from 'next/image';
import Label from '../label';

function CornerArrows() {
  return (
    <>
      {/* Top-left arrow */}
      <div className="absolute top-3 left-3 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        <svg viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" className="w-full h-full">
          <path d="M7 17V7h10" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7 7l10 10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {/* Top-right arrow */}
      <div className="absolute top-3 right-3 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        <svg viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" className="w-full h-full">
          <path d="M17 17V7H7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M17 7L7 17" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {/* Bottom-left arrow */}
      <div className="absolute bottom-3 left-3 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        <svg viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" className="w-full h-full">
          <path d="M7 7v10h10" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7 17L17 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {/* Bottom-right arrow */}
      <div className="absolute bottom-3 right-3 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        <svg viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" className="w-full h-full">
          <path d="M17 7v10H7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M17 17L7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </>
  );
}

export function GridTileImage({
  isInteractive = true,
  active,
  label,
  showPrice,
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
  label?: {
    title: string;
    amount: string;
    currencyCode: string;
    position?: 'bottom' | 'center';
  };
  showPrice?: boolean;
} & React.ComponentProps<typeof Image>) {
  return (
    <div
      className={clsx(
        'group flex h-full w-full items-center justify-center overflow-hidden bg-white hover:border border-white dark:bg-black relative',
        {
          'border-2 border-neutral-900 dark:border-neutral-100': active,
          'border-neutral-200 dark:border-neutral-800': !active
        }
      )}
    >
      {isInteractive && <CornerArrows />}
      {props.src ? (
        <Image
          className={clsx('relative h-full w-full object-contain filter', {
            'transition duration-300 ease-in-out group-hover:scale-105': isInteractive
          })}
          {...props}
        />
      ) : null}
      {label ? (
        <Label
          title={label.title}
          amount={showPrice ? label.amount : ''}
          currencyCode={label.currencyCode}
          position={label.position}
        />
      ) : null}
    </div>
  );
}
