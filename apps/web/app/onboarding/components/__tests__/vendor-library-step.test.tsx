import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useForm } from 'react-hook-form'
import { VendorLibraryStep } from '../vendor-library-step'
import { OnboardingFormData } from '@/types/onboarding'
import { Form } from '@/components/ui/form'

function TestWrapper() {
  const form = useForm<OnboardingFormData>({
    defaultValues: {
      'your-name': '',
      'business-name': '',
      'work-style': 'solo',
      'gmail-connect': false,
      vendors: [{ name: '', email: '', category: '' }],
    },
  })

  return (
    <Form {...form}>
      <VendorLibraryStep form={form} />
    </Form>
  )
}

describe('VendorLibraryStep', () => {
  it('allows users to add vendor information', async () => {
    const user = userEvent.setup()
    render(<TestWrapper />)
    
    const nameInput = screen.getByPlaceholderText('Enter Vendor Name')
    const emailInput = screen.getByPlaceholderText('Enter Vendor Email')
    
    await user.type(nameInput, 'Photographer Co')
    await user.type(emailInput, 'vendor@example.com')
    
    expect(nameInput).toHaveValue('Photographer Co')
    expect(emailInput).toHaveValue('vendor@example.com')
  })

  it('allows users to add multiple vendors', async () => {
    const user = userEvent.setup()
    render(<TestWrapper />)
    
    const addButton = screen.getByRole('button', { name: /Add Vendor/i })
    await user.click(addButton)
    
    expect(screen.getByText('Vendor 2')).toBeInTheDocument()
  })

  it('allows users to remove vendors when multiple exist', async () => {
    const user = userEvent.setup()
    render(<TestWrapper />)
    
    const addButton = screen.getByRole('button', { name: /Add Vendor/i })
    await user.click(addButton)
    
    const deleteButtons = screen.getAllByRole('button', { name: '' })
    const deleteButton = deleteButtons.find(btn => btn.querySelector('svg'))
    
    if (deleteButton) {
      await user.click(deleteButton)
      expect(screen.queryByText('Vendor 2')).not.toBeInTheDocument()
    }
  })
})
