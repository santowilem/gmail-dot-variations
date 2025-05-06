import React from 'react';

export const EmptyState: React.FC = () => (
  <div className='text-center py-8 text-gray-500 dark:text-gray-400'>
    <p>Enter your Gmail address to generate dot variations.</p>
    <p className='text-xs mt-2'>
      Example: "john.doe@gmail.com" and "johndoe@gmail.com" are the same for
      Gmail.
    </p>
  </div>
);
