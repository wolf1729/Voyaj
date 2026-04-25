import { render, screen } from '@testing-library/react'
import Hero from '@/components/sections/Hero'

// Mock the WaitlistForm since it's tested separately
jest.mock('@/components/ui/WaitlistForm', () => {
  return function MockWaitlistForm() {
    return <div data-testid="mock-waitlist-form">Mock Waitlist Form</div>
  }
})

describe('Hero Component', () => {
  it('renders the main headline', () => {
    render(<Hero />)
    const title = screen.getByText(/Discover the unmapped/i)
    expect(title).toBeInTheDocument()
  })

  it('renders the early access badge', () => {
    render(<Hero />)
    expect(screen.getByText(/Exclusive Early Access/i)).toBeInTheDocument()
  })

  it('includes the WaitlistForm component', () => {
    render(<Hero />)
    expect(screen.getByTestId('mock-waitlist-form')).toBeInTheDocument()
  })

  it('renders the hero background image', () => {
    render(<Hero />)
    const bgImage = screen.getByAltText(/Travel Landscape/i)
    expect(bgImage).toBeInTheDocument()
  })
})
