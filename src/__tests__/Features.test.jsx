import { render, screen, fireEvent, act } from '@testing-library/react'
import Features from '@/components/sections/Features'

// Mock the Map as a named export
jest.mock('@/components/ui/map', () => ({
  Map: function MockMap() {
    return <div data-testid="mock-map-explorer">Mock Map Explorer</div>
  }
}))

describe('Features Component', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('renders correctly', () => {
    render(<Features />)
    expect(screen.getByText(/Reimagining Travel/i)).toBeInTheDocument()
  })

  it('auto-cycles through features', () => {
    render(<Features />)
    
    // Initially first feature is active
    const panels = screen.getAllByRole('heading', { level: 3 }).map(h => h.closest('.panel'))
    expect(panels[0]).toHaveClass('panelActive')
    
    // Advance time by 5 seconds
    act(() => {
      jest.advanceTimersByTime(5000)
    })
    
    expect(panels[1]).toHaveClass('panelActive')
  })

  it('allows manual feature selection', () => {
    render(<Features />)
    const panels = screen.getAllByRole('heading', { level: 3 }).map(h => h.closest('.panel'))
    
    fireEvent.click(panels[2])
    expect(panels[2]).toHaveClass('panelActive')
  })

  it('cycles back to the first feature after the last one', () => {
    render(<Features />)
    const panels = screen.getAllByRole('heading', { level: 3 }).map(h => h.closest('.panel'))
    
    // Advance through all 4 features (5s each)
    act(() => {
      jest.advanceTimersByTime(5000 * 4)
    })
    
    expect(panels[0]).toHaveClass('panelActive')
  })
})
