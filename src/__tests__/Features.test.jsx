import { render, screen } from '@testing-library/react'
import Features from '@/components/sections/Features'

// Mock the Map as a named export to match Features.jsx
jest.mock('@/components/ui/map', () => ({
  Map: function MockMap() {
    return <div data-testid="mock-map-explorer">Mock Map Explorer</div>
  }
}))

describe('Features Component', () => {
  it('renders the section header correctly', () => {
    render(<Features />)
    expect(screen.getByText(/Reimagining Travel/i)).toBeInTheDocument()
    expect(screen.getByText(/A suite of intelligent features/i)).toBeInTheDocument()
  })

  it('renders bento grid feature cards', () => {
    render(<Features />)
    // Using getAllByText because titles appear twice (vertical title and main title)
    expect(screen.getAllByText(/Global Discovery/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Smart Itineraries/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Reel to Reality/i).length).toBeGreaterThan(0)
  })

  it('contains the interactive map element', () => {
    render(<Features />)
    expect(screen.getByTestId('mock-map-explorer')).toBeInTheDocument()
  })
})
