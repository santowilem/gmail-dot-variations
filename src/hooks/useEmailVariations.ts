import { useState, useEffect, useMemo, useCallback } from 'react';
import type { ChangeEvent } from 'react';
import { generateDotVariations } from '@/utils/emailVariations';
import { debounce } from '@/utils/debounce';

export const useEmailVariations = () => {
  const [email, setEmail] = useState('');
  const [variations, setVariations] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showError, setShowError] = useState(false);

  // Check if input has @ character but is not valid Gmail
  const shouldShowError = useCallback((input: string): boolean => {
    if (!input) return false;

    const atIndex = input.indexOf('@');
    if (atIndex === -1) return false;

    // Get the domain part after @
    const domainPart = input.slice(atIndex + 1).toLowerCase();

    // If there's nothing after @, don't show an error
    if (!domainPart) return false;

    // If it's "gmail.com" exactly, it's valid
    if (domainPart === 'gmail.com') return false;

    // Check if what they've typed so far matches the beginning of "gmail.com"
    // "g", "gm", "gma", "gmai", "gmail", "gmail." etc. are all valid prefixes
    const targetDomain = 'gmail.com';
    if (targetDomain.startsWith(domainPart) || domainPart.startsWith('gmail.'))
      return false;

    // If they've typed something that can't possibly become "gmail.com", show error
    return true;
  }, []);

  // Create debounced function for generating variations
  const debouncedGenerateVariations = useMemo(
    () =>
      debounce((inputEmail: string) => {
        if (inputEmail.trim()) {
          setIsGenerating(true);
          try {
            const results = generateDotVariations(
              inputEmail.includes('@gmail.com')
                ? inputEmail
                : `${inputEmail}@gmail.com`
            );
            setVariations(results);
          } catch (error) {
            console.error('Error generating dot variations:', error);
            setVariations([]);
          } finally {
            setIsGenerating(false);
          }
        } else {
          setVariations([]);
        }
      }, 300),
    []
  );

  // Update variations when email changes
  useEffect(() => {
    if (email.trim()) {
      // Check if we should show error based on new logic
      setShowError(shouldShowError(email));

      // Always generate variations for better UX
      debouncedGenerateVariations(email);
    } else {
      setVariations([]);
      setShowError(false);
    }

    // Cleanup function to cancel debounced calls when component unmounts or email changes
    return () => {
      debouncedGenerateVariations.cancel?.();
    };
  }, [email, debouncedGenerateVariations, shouldShowError]);

  const handleEmailChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
  }, []);

  const finalEmail = useMemo(() => {
    return email.includes('@gmail.com')
      ? email
      : email
      ? `${email}@gmail.com`
      : '';
  }, [email]);

  const isValidGmail = useMemo(() => {
    return (
      finalEmail.trim().length > 0 &&
      finalEmail.toLowerCase().endsWith('@gmail.com')
    );
  }, [finalEmail]);

  return {
    email,
    setEmail,
    finalEmail,
    variations,
    isGenerating,
    showError,
    isValidGmail,
    handleEmailChange,
  };
};
