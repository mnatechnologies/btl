type ComingSoonOverlayProps = {
  size?: 'large' | 'small';
};

export default function ComingSoonOverlay({ size = 'large' }: ComingSoonOverlayProps) {
  const badgePadding = size === 'large'
    ? 'px-3 py-1.5 sm:px-4 sm:py-2'
    : 'px-2 py-1 sm:px-3 sm:py-1.5';

  const badgeText = size === 'large'
    ? 'text-xs sm:text-sm'
    : 'text-[10px] sm:text-xs';

  const subText = size === 'large'
    ? 'text-xs sm:text-sm'
    : 'text-[10px] sm:text-xs';

  const marginBottom = size === 'large'
    ? 'mb-1 sm:mb-2'
    : 'mb-0.5 sm:mb-1';

  return (
    <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-30">
      <div className="text-center">
          <span className={`inline-block ${badgePadding} bg-yellow-500 text-black font-bold rounded ${marginBottom} ${badgeText}`}>
            COMING SOON
          </span>
        <p className={`text-white ${subText}`}>Available Soon</p>
      </div>
    </div>
  );
}
