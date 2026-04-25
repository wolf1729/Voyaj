import { render, screen, fireEvent } from '@testing-library/react'
import WaitlistForm from '@/components/ui/WaitlistForm'

// Mock the popcrumb hook
jest.mock('popcrumb', () => ({
  useSnackbar: () => ({
    success: jest.fn(),
    error: jest.fn(),
  }),
}))

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ success: true }),
  })
)

describe('WaitlistForm', () => {
  it('renders the early access button', () => {
    render(<WaitlistForm />)
    expect(screen.getByText(/Get Early Access/i)).toBeInTheDocument()
  })

  it('updates email state on change', () => {
    render(<WaitlistForm />)
    const input = screen.getByPlaceholderText(/name@example.com/i)
    fireEvent.change(input, { target: { value: 'test@voyaj.com' } })
    expect(input.value).toBe('test@voyaj.com')
  })
})
