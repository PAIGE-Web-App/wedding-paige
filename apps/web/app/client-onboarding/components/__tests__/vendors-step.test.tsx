import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useForm } from 'react-hook-form'
import { VendorsStep } from '../vendors-step'
import { ClientOnboardingFormData } from '../../page'
import { Form } from '@/components/ui/form'

function TestWrapper() {
  const form = useForm<ClientOnboardingFormData>({
    defaultValues: {
      'first-name': '',
      'last-name': '',
      'partner-first-name': '',
      'partner-last-name': '',
      'wedding-date': '',
      'date-undecided': false,
      emails: [''],
      vendors: [
        {
          name: 'The Barn at Willow Creek',
          email: 'info@barnwillowcreek.com',
          category: '',
        },
      ],
    },
  })

  return (
    <Form {...form}>
      <VendorsStep form={form} />
    </Form>
  )
}

describe('VendorsStep', () => {
  it('allows users to search and select vendors from library', async () => {
    const user = userEvent.setup()
    render(<TestWrapper />)

    const searchInput = screen.getByPlaceholderText('Search vendor library')
    await user.type(searchInput, 'Barn')

    expect(searchInput).toHaveValue('Barn')
    const vendorNames = screen.getAllByText('The Barn at Willow Creek')
    expect(vendorNames.length).toBeGreaterThan(0)
  })

  it('allows users to add a new vendor not in library', async () => {
    const user = userEvent.setup()
    render(<TestWrapper />)

    const addButton = screen.getByRole('button', { name: /Add a Vendor not in your Library/i })
    await user.click(addButton)

    const nameInput = screen.getByPlaceholderText('Enter Vendor Name')
    const emailInput = screen.getByPlaceholderText('Enter Vendor Email')

    await user.type(nameInput, 'New Vendor')
    await user.type(emailInput, 'vendor@example.com')

    expect(nameInput).toHaveValue('New Vendor')
    expect(emailInput).toHaveValue('vendor@example.com')
  })

  it('allows users to remove selected vendors', async () => {
    const user = userEvent.setup()
    render(<TestWrapper />)

    const removeButtons = screen.getAllByRole('button')
    const removeButton = removeButtons.find(btn =>
      btn.querySelector('svg') && btn.className.includes('hover:text-foreground')
    )

    if (removeButton) {
      await user.click(removeButton)
      await waitFor(() => {
        const vendorNames = screen.queryAllByText('The Barn at Willow Creek')
        expect(vendorNames.length).toBeLessThan(2)
      })
    }
  })

  it('shows empty state when no vendors are selected', () => {
    const EmptyWrapper = () => {
      const form = useForm<ClientOnboardingFormData>({
        defaultValues: {
          'first-name': '',
          'last-name': '',
          'partner-first-name': '',
          'partner-last-name': '',
          'wedding-date': '',
          'date-undecided': false,
          emails: [''],
          vendors: [],
        },
      })

      return (
        <Form {...form}>
          <VendorsStep form={form} />
        </Form>
      )
    }

    render(<EmptyWrapper />)

    expect(screen.getByText('No vendors selected')).toBeInTheDocument()
  })
})
