import React, { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';
import EmailVariationItem from './EmailVariationItem';
import { useEmailVariations } from '@/hooks/useEmailVariations';

const GmailDotGenerator: React.FC = () => {
  const {
    email,
    variations,
    isGenerating,
    showError,
    isValidGmail,
    handleEmailChange,
  } = useEmailVariations();

  const handleCopyAll = useCallback(async () => {
    if (!variations.length) return;

    try {
      const textToCopy = variations.join('\n');
      await navigator.clipboard.writeText(textToCopy);

      toast.success('All variations copied!', {
        description: `${variations.length} email variations copied to clipboard.`,
        duration: 3000,
      });
    } catch (error) {
      console.error('Failed to copy variations:', error);
      toast.error('Copy failed', {
        description: 'Could not copy to clipboard. Please try again.',
      });
    }
  }, [variations]);

  return (
    <Card className='w-full max-w-lg mx-auto overflow-hidden'>
      <CardHeader className='pb-4'>
        <CardTitle className='text-2xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400'>
          Gmail Dot Variations
        </CardTitle>
        <CardDescription className='text-center'>
          Generate all possible dot combinations for your Gmail address.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          <div>
            <Input
              className='bg-white/80 dark:bg-[#252525]/80 h-12 text-lg px-4'
              placeholder='Enter your Gmail address'
              value={email}
              onChange={handleEmailChange}
              aria-label='Email address input'
              aria-invalid={showError}
              aria-describedby={showError ? 'email-error' : undefined}
            />
            {email && showError && (
              <p
                id='email-error'
                className='text-sm text-red-500 mt-1 dark:text-red-400'
                role='alert'
              >
                Please enter a valid Gmail address (@gmail.com)
              </p>
            )}
          </div>

          {variations.length > 0 && (
            <>
              <div className='flex justify-between items-center'>
                <Badge
                  variant='outline'
                  className='bg-white/80 dark:bg-[#252525]/80'
                >
                  {variations.length} variations
                </Badge>
                <Button
                  variant='outline'
                  size='sm'
                  className='flex items-center gap-1 dark:bg-[#252525]/80 dark:border-gray-700'
                  onClick={handleCopyAll}
                  disabled={isGenerating || variations.length === 0}
                  aria-label={`Copy all ${variations.length} variations to clipboard`}
                >
                  <Copy size={14} />
                  <span>Copy All</span>
                </Button>
              </div>

              <div
                className='max-h-80 overflow-y-auto pr-1 space-y-1 custom-scrollbar'
                aria-label='Email variations list'
                role='list'
              >
                {variations.map((variant, index) => (
                  <EmailVariationItem
                    key={index}
                    email={variant}
                    index={index}
                  />
                ))}
              </div>
            </>
          )}

          {isGenerating && (
            <p className='text-center text-sm'>Generating variations...</p>
          )}

          {!isGenerating &&
            variations.length === 0 &&
            email &&
            isValidGmail && (
              <p className='text-center text-sm'>
                No variations available for this email.
              </p>
            )}

          {!email && (
            <div className='text-center py-8 text-gray-500 dark:text-gray-400'>
              <p>Enter your Gmail address to generate dot variations.</p>
              <p className='text-xs mt-2'>
                Example: "john.doe@gmail.com" and "johndoe@gmail.com" are the
                same for Gmail.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GmailDotGenerator;
