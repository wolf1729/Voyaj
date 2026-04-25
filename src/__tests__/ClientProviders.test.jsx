import { render, screen } from '@testing-library/react'
import { ClientProviders } from '@/components/providers/ClientProviders'

// Mock popcrumb components
jest.mock('popcrumb', () => ({
  SnackbarProvider: ({ children }) => <div data-testid="snackbar-provider">{children}</div>,
  SnackbarContainer: () => <div data-testid="snackbar-container" />,
  SnackbarManager: () => <div data-testid="snackbar-manager" />,
}))

describe('ClientProviders', () => {
  it('renders children wrapped in SnackbarProvider', () => {
    render(
      <ClientProviders>
        <div data-testid="test-child">Child Content</div>
      </ClientProviders>
    )
    
    expect(screen.getByTestId('snackbar-provider')).toBeInTheDocument()
    expect(screen.getByTestId('snackbar-manager')).toBeInTheDocument()
    expect(screen.getByTestId('snackbar-container')).toBeInTheDocument()
    expect(screen.getByTestId('test-child')).toBeInTheDocument()
  })
})
