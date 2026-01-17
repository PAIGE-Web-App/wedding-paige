import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import OnboardingPage, { onboardingSchema, getSummary } from '../page'
import { OnboardingFormData } from '@/types/onboarding'

describe('OnboardingPage', () => {
  it('renders the onboarding form', () => {
    render(<OnboardingPage />)
    expect(screen.getByPlaceholderText('Enter your full name')).toBeInTheDocument()
  })

  it('validates required fields', async () => {
    const user = userEvent.setup()
    render(<OnboardingPage />)

    const nameInput = screen.getByPlaceholderText('Enter your full name')
    await user.clear(nameInput)
    await user.tab()

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument()
    })
  })

  it('allows users to enter their information', async () => {
    const user = userEvent.setup()
    render(<OnboardingPage />)

    const nameInput = screen.getByPlaceholderText('Enter your full name')
    const businessInput = screen.getByPlaceholderText('Enter business name')

    await user.type(nameInput, 'John Doe')
    await user.type(businessInput, 'Wedding Co')

    expect(nameInput).toHaveValue('John Doe')
    expect(businessInput).toHaveValue('Wedding Co')
  })
})

describe('onboardingSchema', () => {
  it('validates correct form data', () => {
    const validData = {
      'your-name': 'John Doe',
      'business-name': 'Wedding Co',
      'work-style': 'solo',
      'gmail-connect': true,
      vendors: [
        {
          name: 'Vendor Name',
          email: 'vendor@example.com',
          category: 'Photographer',
        },
      ],
    }

    const result = onboardingSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  it('rejects missing name', () => {
    const invalidData = {
      'your-name': '',
      'work-style': 'solo',
      'gmail-connect': true,
      vendors: [],
    }

    const result = onboardingSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
    if (!result.success && result.error.issues.length > 0) {
      const firstIssue = result.error.issues[0]
      expect(firstIssue?.message).toBe('Name is required')
    }
  })

  it('validates vendor email format', () => {
    const invalidData = {
      'your-name': 'John Doe',
      'work-style': 'solo',
      'gmail-connect': true,
      vendors: [
        {
          name: 'Vendor Name',
          email: 'invalid-email',
          category: 'Photographer',
        },
      ],
    }

    const result = onboardingSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues.some(issue => issue.message.includes('email'))).toBe(true)
    }
  })

  it('requires vendor name', () => {
    const invalidData = {
      'your-name': 'John Doe',
      'work-style': 'solo',
      'gmail-connect': true,
      vendors: [
        {
          name: '',
          email: 'vendor@example.com',
          category: 'Photographer',
        },
      ],
    }

    const result = onboardingSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues.some(issue => issue.message.includes('Vendor name'))).toBe(true)
    }
  })
})

describe('getSummary', () => {
  it('generates summary with profile information', () => {
    const data: OnboardingFormData = {
      'your-name': 'John Doe',
      'business-name': 'Wedding Co',
      'work-style': 'solo',
      'gmail-connect': true,
      vendors: [],
    }

    const summary = getSummary(data)

    expect(summary.title).toBe('Planning made easy.')
    expect(summary.description).toBe("Here's how Paige will configure your personalized workspace.")
    expect(summary.sections).toHaveLength(2)
    const firstSection = summary.sections[0]
    expect(firstSection?.title).toBe('Profile Setup')
    expect(firstSection?.items[0]).toBe('John Doe · Wedding Co')
  })

  it('generates summary without business name', () => {
    const data: OnboardingFormData = {
      'your-name': 'John Doe',
      'business-name': '',
      'work-style': 'solo',
      'gmail-connect': true,
      vendors: [],
    }

    const summary = getSummary(data)

    const firstSection = summary.sections[0]
    expect(firstSection?.items[0]).toBe('John Doe')
  })

  it('includes Gmail section when connected', () => {
    const data: OnboardingFormData = {
      'your-name': 'John Doe',
      'business-name': '',
      'work-style': 'solo',
      'gmail-connect': true,
      vendors: [],
    }

    const summary = getSummary(data)

    const gmailSection = summary.sections.find(section => section.title === 'Gmail')
    expect(gmailSection).toBeDefined()
    expect(gmailSection?.items).toContain('michellejpark90@gmail.com')
  })

  it('excludes Gmail section when not connected', () => {
    const data: OnboardingFormData = {
      'your-name': 'John Doe',
      'business-name': '',
      'work-style': 'solo',
      'gmail-connect': false,
      vendors: [],
    }

    const summary = getSummary(data)

    const gmailSection = summary.sections.find(section => section.title === 'Gmail')
    expect(gmailSection).toBeUndefined()
  })

  it('includes vendor library section with vendors', () => {
    const data: OnboardingFormData = {
      'your-name': 'John Doe',
      'business-name': '',
      'work-style': 'solo',
      'gmail-connect': true,
      vendors: [
        {
          name: 'Photographer Co',
          email: 'photographer@example.com',
          category: 'Photographer',
        },
        {
          name: 'Caterer Co',
          email: 'caterer@example.com',
          category: '',
        },
      ],
    }

    const summary = getSummary(data)

    const vendorSection = summary.sections.find(section => section.title === 'Vendor Library')
    expect(vendorSection).toBeDefined()
    expect(vendorSection?.items).toHaveLength(2)
    expect(vendorSection?.items[0]).toBe('Photographer Co · photographer@example.com · Photographer')
    expect(vendorSection?.items[1]).toBe('Caterer Co · caterer@example.com')
  })

  it('excludes vendor library section when empty', () => {
    const data: OnboardingFormData = {
      'your-name': 'John Doe',
      'business-name': '',
      'work-style': 'solo',
      'gmail-connect': true,
      vendors: [],
    }

    const summary = getSummary(data)

    const vendorSection = summary.sections.find(section => section.title === 'Vendor Library')
    expect(vendorSection).toBeUndefined()
  })

  it('handles empty profile data', () => {
    const data: OnboardingFormData = {
      'your-name': '',
      'business-name': '',
      'work-style': 'solo',
      'gmail-connect': true,
      vendors: [],
    }

    const summary = getSummary(data)

    const profileSection = summary.sections.find(section => section.title === 'Profile Setup')
    expect(profileSection).toBeUndefined()
  })
})
