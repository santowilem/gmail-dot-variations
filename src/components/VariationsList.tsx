import React from 'react';
import EmailVariationItem from './EmailVariationItem';

interface VariationsListProps {
  variations: string[];
}

export const VariationsList: React.FC<VariationsListProps> = React.memo(
  ({ variations }) => (
    <div className='max-h-80 overflow-y-auto pr-1 space-y-1 custom-scrollbar'>
      {variations.map((variant, index) => (
        <EmailVariationItem key={index} email={variant} index={index} />
      ))}
    </div>
  )
);

VariationsList.displayName = 'VariationsList';
