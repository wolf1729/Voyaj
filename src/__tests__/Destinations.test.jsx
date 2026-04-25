import { render, screen } from '@testing-library/react'
import Destinations from '@/components/sections/Destinations'

describe('Destinations Component', () => {
  it('renders the section title and subtitle', () => {
    render(<Destinations />)
    expect(screen.getByText(/Popular Destinations/i)).toBeInTheDocument()
    expect(screen.getByText(/Explore the most sought-after locations/i)).toBeInTheDocument()
  })

  it('renders all three destination cards', () => {
    render(<Destinations />)
    expect(screen.getByText(/Paris, France/i)).toBeInTheDocument()
    expect(screen.getByText(/Kyoto, Japan/i)).toBeInTheDocument()
    expect(screen.getByText(/Bali, Indonesia/i)).toBeInTheDocument()
  })

  it('contains the correct destination images', () => {
    render(<Destinations />)
    expect(screen.getByAltText('Paris')).toBeInTheDocument()
    expect(screen.getByAltText('Kyoto')).toBeInTheDocument()
    expect(screen.getByAltText('Bali')).toBeInTheDocument()
  })
})
