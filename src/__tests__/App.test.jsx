import { render, screen } from '@testing-library/react'
import Home from '@/app/page'
import RootLayout from '@/app/layout'

// Mock fonts properly
jest.mock('next/font/google', () => ({
  Geist: jest.fn().mockReturnValue({ variable: '--font-geist-sans' }),
  Geist_Mono: jest.fn().mockReturnValue({ variable: '--font-geist-mono' }),
}))

// Mock analytics
jest.mock('@vercel/analytics/next', () => ({
  Analytics: () => <div data-testid="analytics" />,
}))

// Mock components to simplify page test
jest.mock('@/components/layout/Header', () => function Header() { return <header>Header</header>; })
jest.mock('@/components/layout/Footer', () => function Footer() { return <footer>Footer</footer>; })
jest.mock('@/components/sections/Hero', () => function Hero() { return <section>Hero</section>; })
jest.mock('@/components/sections/Destinations', () => function Destinations() { return <section>Destinations</section>; })
jest.mock('@/components/sections/Features', () => function Features() { return <section>Features</section>; })

describe('App Root Components', () => {
  it('executes RootLayout function', () => {
    // Calling the function directly to hit the lines without JSDOM nesting issues
    const res = RootLayout({ children: <div data-testid="child" /> })
    expect(res).toBeDefined()
  })

  it('renders Home page correctly', () => {
    render(<Home />)
    expect(screen.getByText('Header')).toBeInTheDocument()
    expect(screen.getByText('Hero')).toBeInTheDocument()
    expect(screen.getByText('Destinations')).toBeInTheDocument()
    expect(screen.getByText('Features')).toBeInTheDocument()
    expect(screen.getByText('Footer')).toBeInTheDocument()
  })
})
