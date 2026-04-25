import { cn } from '@/lib/utils'

describe('utils/cn', () => {
  it('merges tailwind classes correctly', () => {
    expect(cn('px-2', 'py-2')).toBe('px-2 py-2')
    expect(cn('px-2', 'px-4')).toBe('px-4') // twMerge handles overrides
    expect(cn('text-red-500', { 'bg-blue-500': true, 'bg-green-500': false })).toBe('text-red-500 bg-blue-500')
  })
})
