import { render, screen } from '@testing-library/react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

describe('Layout Components', () => {
  it('renders the Header correctly', () => {
    render(<Header />)
    expect(screen.getByText('Voyaj.')).toBeInTheDocument()
  })

  it('renders the Footer correctly', () => {
    render(<Footer />)
    expect(screen.getByText('Voyaj.')).toBeInTheDocument()
    expect(screen.getByText(/All rights reserved/i)).toBeInTheDocument()
  })
})
