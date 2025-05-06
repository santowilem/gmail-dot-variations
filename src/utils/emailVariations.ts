/**
 * Generates Gmail dot variations for an email
 * @param email - The email to generate variations for
 * @returns Array of all possible dot variations
 */
export const generateDotVariations = (email: string): string[] => {
  // Validate and extract username and domain
  const emailRegex = /^([^@]+)@(gmail\.com)$/i;
  const match = email.match(emailRegex);

  if (!match) {
    return [];
  }

  const [, username, domain] = match;

  // Remove existing dots from username
  const cleanUsername = username.replace(/\./g, '');

  if (cleanUsername.length <= 1) {
    return [`${cleanUsername}@${domain}`];
  }

  // Generate all possible dot variations
  const variations: string[] = [];

  // Add the variation with no dots
  variations.push(`${cleanUsername}@${domain}`);

  // Generate variations with dots in different positions
  const generateVariationsWithDots = (prefix: string, remaining: string) => {
    if (remaining.length <= 1) {
      return;
    }

    for (let i = 1; i < remaining.length; i++) {
      const newPrefix = prefix + remaining.substring(0, i) + '.';
      const newRemaining = remaining.substring(i);

      variations.push(`${newPrefix}${newRemaining}@${domain}`);
      generateVariationsWithDots(newPrefix, newRemaining);
    }
  };

  generateVariationsWithDots('', cleanUsername);

  // Sort by length and then alphabetically for better UX
  return [...new Set(variations)].sort((a, b) => {
    if (a.length !== b.length) {
      return a.length - b.length;
    }
    return a.localeCompare(b);
  });
};
