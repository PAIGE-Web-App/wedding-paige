import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useForm } from 'react-hook-form'
import { HowYouWorkStep } from '../how-you-work-step'
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
      <HowYouWorkStep form={form} />
    </Form>
  )
}

describe('HowYouWorkStep', () => {
  it('allows users to select their work style', async () => {
    const user = userEvent.setup()
    render(<TestWrapper />)
    
    const soloOption = screen.getByText('SOLO PLANNER / COORDINATOR').closest('div')
    expect(soloOption).toBeInTheDocument()
    
    if (soloOption) {
      await user.click(soloOption)
      await waitFor(() => {
        expect(screen.getByText('Selected')).toBeInTheDocument()
      })
    }
  })

  it('shows planning team option as coming soon', () => {
    render(<TestWrapper />)
    
    expect(screen.getByText('PLANNING TEAM')).toBeInTheDocument()
    expect(screen.getByText('Coming Soon')).toBeInTheDocument()
  })
})
