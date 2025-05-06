import React, { useState, useCallback, useRef } from 'react';
import { Copy, Check } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface CopyButtonProps {
  text: string;
  className?: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ text, className }) => {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleCopy = useCallback(async () => {
    try {
      // Clear any existing timeout
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success('Copied!', {
        description: `"${text}" has been copied to the clipboard.`,
        duration: 2000,
      });

      // Reset the copied state after 2 seconds
      timerRef.current = setTimeout(() => {
        setCopied(false);
        timerRef.current = null;
      }, 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
      toast.error('Copy failed', {
        description: 'Could not copy to clipboard',
      });
    }
  }, [text]);

  // Clean up timer on unmount
  React.useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={handleCopy}
            className={cn(
              'p-1.5 rounded-md transition-colors',
              'hover:bg-accent hover:text-accent-foreground',
              className
            )}
            aria-label='Copy to clipboard'
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{copied ? 'Copied!' : 'Copy to clipboard'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CopyButton;
