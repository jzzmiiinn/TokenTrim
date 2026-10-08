'use client';

import { Icons } from '@/components/icons';
import { Input } from '@/components/ui/input';

export default function SearchInput() {
  return (
    <div className='relative w-full max-w-sm'>
      <Icons.search className='text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2' />
      <Input
        type='search'
        placeholder='Search...'
        className='h-9 w-40 pl-9 sm:w-64'
      />
    </div>
  );
}
