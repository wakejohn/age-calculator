import React from 'react';

interface AdSpaceProps {
  slotId?: string;
  className?: string;
}

/**
 * AdSpace - AdSense Ready layout placeholder.
 * Non-intrusive container structured for future display ad placements
 * without cluttering UI or confusing users.
 */
export const AdSpace: React.FC<AdSpaceProps> = ({ slotId = 'default-slot', className = '' }) => {
  return (
    <div 
      data-ad-slot={slotId}
      aria-label="Advertisement placeholder space"
      className={`w-full max-w-7xl mx-auto my-6 px-4 py-3 rounded-xl border border-dashed border-slate-200/80 bg-slate-50/50 flex flex-col items-center justify-center text-center text-xs text-slate-400 select-none ${className}`}
    >
      <span className="font-semibold text-[10px] tracking-wider uppercase text-slate-400/80">
        Advertisement Placement Space
      </span>
      <span className="text-[11px] text-slate-400 mt-0.5">
        Reserved for non-intrusive standard web ads
      </span>
    </div>
  );
};
