import React, { memo } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import CopyButton from './CopyButton';

interface EmailVariationItemProps {
  email: string;
  index: number;
}

const EmailVariationItem: React.FC<EmailVariationItemProps> = memo(
  ({ email, index }) => {
    return (
      <Card
        className={cn(
          'flex flex-row justify-between items-center px-4 py-3 mb-2',
          'bg-card/90 dark:bg-card/90 backdrop-blur-sm',
          'border-border hover:border-ring/20',
          'hover:shadow-sm hover:shadow-ring/5',
          'transition-all duration-200 ease-in-out',
          'rounded-md'
        )}
        role='listitem'
      >
        <div className='flex items-center gap-3 flex-1 min-w-0'>
          <span
            className='text-xs text-muted-foreground font-mono'
            aria-hidden='true' // Hide from screen readers as it's just visual decoration
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <span
            className='flex-1 truncate text-sm md:text-base font-medium'
            title={email} // Show full email on hover
          >
            {email}
          </span>
        </div>
        <CopyButton
          text={email}
          className='ml-2 text-muted-foreground hover:text-foreground'
        />
      </Card>
    );
  }
);

// Add display name for better debugging
EmailVariationItem.displayName = 'EmailVariationItem';

export default EmailVariationItem;
