import { render, screen } from '@testing-library/react'
import { useForm } from 'react-hook-form'
import { ConnectGmailStep } from '../connect-gmail-step'
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
      <ConnectGmailStep form={form} />
    </Form>
  )
}

describe('ConnectGmailStep', () => {
  it('displays information about Gmail connection', () => {
    render(<TestWrapper />)

    expect(screen.getByText(/How does this work/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Watch a Demo/i })).toBeInTheDocument()
  })
})
