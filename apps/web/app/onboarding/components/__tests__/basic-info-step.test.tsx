import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useForm } from 'react-hook-form'
import { BasicInfoStep } from '../basic-info-step'
import { OnboardingFormData } from '@/types/onboarding'
import { Form } from '@/components/ui/form'

function TestWrapper() {
  const form = useForm<OnboardingFormData>({
    defaultValues: {
      'your-name': '',
      'business-name': '',
      'work-style': 'solo',
      'gmail-connect': false,
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
  it('allows users to enter their name', async () => {
    const user = userEvent.setup()
    render(<TestWrapper />)
    
    const nameInput = screen.getByPlaceholderText('Enter your full name')
    await user.type(nameInput, 'John Doe')
    
    expect(nameInput).toHaveValue('John Doe')
  })

  it('allows users to enter their business name', async () => {
    const user = userEvent.setup()
    render(<TestWrapper />)
    
    const businessInput = screen.getByPlaceholderText('Enter business name')
    await user.type(businessInput, 'Wedding Co')
    
    expect(businessInput).toHaveValue('Wedding Co')
  })
})
