import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import WaitlistForm from '@/components/ui/WaitlistForm'

// Mock the popcrumb hook
const mockSuccess = jest.fn()
const mockError = jest.fn()

jest.mock('popcrumb', () => ({
  useSnackbar: () => ({
    snackbar: {
      success: mockSuccess,
      error: mockError,
    },
  }),
}))

// Mock fetch
const mockFetch = jest.fn()
global.fetch = mockFetch

describe('WaitlistForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    process.env.NEXT_PUBLIC_API_URL = 'http://localhost:3000'
  })

  it('renders correctly', () => {
    render(<WaitlistForm />)
    expect(screen.getByText(/Secure Your Boarding Pass/i)).toBeInTheDocument()
  })

  it('updates email on change', () => {
    render(<WaitlistForm />)
    const input = screen.getByPlaceholderText(/name@example.com/i)
    fireEvent.change(input, { target: { value: 'test@example.com' } })
    expect(input.value).toBe('test@example.com')
  })

  it('handles successful submission', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    })

    render(<WaitlistForm />)
    const input = screen.getByPlaceholderText(/name@example.com/i)
    const button = screen.getByText(/Get Early Access/i)

    fireEvent.change(input, { target: { value: 'test@example.com' } })
    fireEvent.click(button)

    expect(screen.getByText(/Processing/i)).toBeInTheDocument()

    await waitFor(() => {
      expect(mockSuccess).toHaveBeenCalledWith(expect.stringContaining('Welcome aboard'))
      expect(screen.getByText(/Boarding Pass Secured/i)).toBeInTheDocument()
      expect(screen.getByText(/You are on the list/i)).toBeInTheDocument()
    })
  })

  it('handles submission error', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ message: 'Email already exists' }),
    })

    render(<WaitlistForm />)
    const input = screen.getByPlaceholderText(/name@example.com/i)
    const button = screen.getByText(/Get Early Access/i)

    fireEvent.change(input, { target: { value: 'test@example.com' } })
    fireEvent.click(button)

    await waitFor(() => {
      expect(mockError).toHaveBeenCalledWith('Email already exists')
      expect(screen.getByText('Email already exists')).toBeInTheDocument()
    })
  })

  it('handles network error', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network failure'))

    render(<WaitlistForm />)
    const input = screen.getByPlaceholderText(/name@example.com/i)
    const button = screen.getByText(/Get Early Access/i)

    fireEvent.change(input, { target: { value: 'test@example.com' } })
    fireEvent.click(button)

    await waitFor(() => {
      expect(mockError).toHaveBeenCalledWith('Network failure')
    })
  })

  it('handles submission error with fallback message', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ }), // No message
    })

    render(<WaitlistForm />)
    const input = screen.getByPlaceholderText(/name@example.com/i)
    const button = screen.getByText(/Get Early Access/i)

    fireEvent.change(input, { target: { value: 'test@example.com' } })
    fireEvent.click(button)

    await waitFor(() => {
      expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    })
  })

  it('does not submit if email is empty', () => {
    render(<WaitlistForm />)
    const button = screen.getByText(/Get Early Access/i)
    
    // Explicitly hit the "if (!email) return;" branch
    fireEvent.click(button)
    expect(mockFetch).not.toHaveBeenCalled()
    expect(screen.getByText('Get Early Access')).toBeInTheDocument()
  })
})
