import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useForm } from 'react-hook-form'
import { BasicInfoStep } from '../basic-info-step'
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
      vendors: [],
    },
  })

  return (
    <Form {...form}>
      <BasicInfoStep form={form} />
    </Form>
  )
}

describe('BasicInfoStep', () => {
  it('allows users to enter couple names', async () => {
    const user = userEvent.setup()
    render(<TestWrapper />)

    const firstNameInputs = screen.getAllByPlaceholderText('Enter first name')
    const lastNameInputs = screen.getAllByPlaceholderText('Enter last name')
    const firstNameInput = firstNameInputs[0]
    const lastNameInput = lastNameInputs[0]
    const partnerFirstNameInput = firstNameInputs[1]
    const partnerLastNameInput = lastNameInputs[1]

    expect(firstNameInput).toBeDefined()
    expect(lastNameInput).toBeDefined()
    expect(partnerFirstNameInput).toBeDefined()
    expect(partnerLastNameInput).toBeDefined()

    if (firstNameInput && lastNameInput && partnerFirstNameInput && partnerLastNameInput) {
      await user.type(firstNameInput, 'John')
      await user.type(lastNameInput, 'Doe')
      await user.type(partnerFirstNameInput, 'Jane')
      await user.type(partnerLastNameInput, 'Smith')

      expect(firstNameInput).toHaveValue('John')
      expect(lastNameInput).toHaveValue('Doe')
      expect(partnerFirstNameInput).toHaveValue('Jane')
      expect(partnerLastNameInput).toHaveValue('Smith')
    }
  })

  it('allows users to add multiple email addresses', async () => {
    const user = userEvent.setup()
    render(<TestWrapper />)

    const addEmailButton = screen.getByRole('button', { name: /Add Email Address/i })
    const allInputs = screen.getAllByRole('textbox')
    const initialCount = allInputs.length

    await user.click(addEmailButton)

    await waitFor(() => {
      const newInputs = screen.getAllByRole('textbox')
      expect(newInputs.length).toBeGreaterThan(initialCount)
    }, {
      timeout: 2000
    })
  })
})
