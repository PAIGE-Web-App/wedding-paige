import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ClientOnboardingPage, { clientOnboardingSchema, getSummary } from '../page'
import { ClientOnboardingFormData } from '../page'

describe('ClientOnboardingPage', () => {
  it('renders the onboarding form', () => {
    render(<ClientOnboardingPage />)
    const firstNameInputs = screen.getAllByPlaceholderText('Enter first name')
    expect(firstNameInputs.length).toBeGreaterThan(0)
  })

  it('validates required fields', async () => {
    const user = userEvent.setup()
    render(<ClientOnboardingPage />)

    const firstNameInputs = screen.getAllByPlaceholderText('Enter first name')
    const firstNameInput = firstNameInputs[0]
    expect(firstNameInput).toBeDefined()
    if (firstNameInput) {
      await user.clear(firstNameInput)
      await user.tab()

      await waitFor(() => {
        expect(screen.getByText('First name is required')).toBeInTheDocument()
      })
    }
  })

  it('allows users to enter couple information', async () => {
    const user = userEvent.setup()
    render(<ClientOnboardingPage />)

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
})

describe('clientOnboardingSchema', () => {
  it('validates correct form data', () => {
    const validData = {
      'first-name': 'John',
      'last-name': 'Doe',
      'partner-first-name': 'Jane',
      'partner-last-name': 'Smith',
      'wedding-date': '2024-06-15',
      'date-undecided': false,
      emails: ['john@example.com'],
      vendors: [
        {
          name: 'Vendor Name',
          email: 'vendor@example.com',
          category: 'Photographer',
        },
      ],
    }

    const result = clientOnboardingSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  it('rejects missing first name', () => {
    const invalidData = {
      'first-name': '',
      'last-name': 'Doe',
      'partner-first-name': 'Jane',
      'partner-last-name': 'Smith',
      'wedding-date': '2024-06-15',
      'date-undecided': false,
      emails: ['john@example.com'],
      vendors: [],
    }

    const result = clientOnboardingSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
    if (!result.success && result.error.issues.length > 0) {
      const firstIssue = result.error.issues[0]
      expect(firstIssue?.message).toBe('First name is required')
    }
  })

  it('rejects missing last name', () => {
    const invalidData = {
      'first-name': 'John',
      'last-name': '',
      'partner-first-name': 'Jane',
      'partner-last-name': 'Smith',
      'wedding-date': '2024-06-15',
      'date-undecided': false,
      emails: ['john@example.com'],
      vendors: [],
    }

    const result = clientOnboardingSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
    if (!result.success && result.error.issues.length > 0) {
      const lastNameIssue = result.error.issues.find(issue =>
        issue.message.includes('Last name') || issue.message.includes('last name')
      )
      expect(lastNameIssue).toBeDefined()
    }
  })

  it('rejects missing partner first name', () => {
    const invalidData = {
      'first-name': 'John',
      'last-name': 'Doe',
      'partner-first-name': '',
      'partner-last-name': 'Smith',
      'wedding-date': '2024-06-15',
      'date-undecided': false,
      emails: ['john@example.com'],
      vendors: [],
    }

    const result = clientOnboardingSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
    if (!result.success && result.error.issues.length > 0) {
      const firstIssue = result.error.issues[0]
      expect(firstIssue?.message).toBe("Partner's first name is required")
    }
  })

  it('rejects missing partner last name', () => {
    const invalidData = {
      'first-name': 'John',
      'last-name': 'Doe',
      'partner-first-name': 'Jane',
      'partner-last-name': '',
      'wedding-date': '2024-06-15',
      'date-undecided': false,
      emails: ['john@example.com'],
      vendors: [],
    }

    const result = clientOnboardingSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
    if (!result.success && result.error.issues.length > 0) {
      const firstIssue = result.error.issues[0]
      expect(firstIssue?.message).toBe("Partner's last name is required")
    }
  })

  it('requires wedding date or date-undecided', () => {
    const invalidData = {
      'first-name': 'John',
      'last-name': 'Doe',
      'partner-first-name': 'Jane',
      'partner-last-name': 'Smith',
      'wedding-date': '',
      'date-undecided': false,
      emails: ['john@example.com'],
      vendors: [],
    }

    const result = clientOnboardingSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
    if (!result.success) {
      const dateIssue = result.error.issues.find(issue =>
        issue.message.includes('wedding date') || issue.message.includes("haven't decided")
      )
      expect(dateIssue).toBeDefined()
    }
  })

  it('validates email format', () => {
    const invalidData = {
      'first-name': 'John',
      'last-name': 'Doe',
      'partner-first-name': 'Jane',
      'partner-last-name': 'Smith',
      'wedding-date': '2024-06-15',
      'date-undecided': false,
      emails: ['invalid-email'],
      vendors: [],
    }

    const result = clientOnboardingSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
    if (!result.success) {
      const emailIssue = result.error.issues.find(issue =>
        issue.message.includes('email')
      )
      expect(emailIssue).toBeDefined()
    }
  })

  it('allows date-undecided when wedding date is empty', () => {
    const validData = {
      'first-name': 'John',
      'last-name': 'Doe',
      'partner-first-name': 'Jane',
      'partner-last-name': 'Smith',
      'wedding-date': '',
      'date-undecided': true,
      emails: ['john@example.com'],
      vendors: [],
    }

    const result = clientOnboardingSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })
})

describe('getSummary', () => {
  it('generates summary with couple information', () => {
    const data: ClientOnboardingFormData = {
      'first-name': 'John',
      'last-name': 'Doe',
      'partner-first-name': 'Jane',
      'partner-last-name': 'Smith',
      'wedding-date': '2024-06-15',
      'date-undecided': false,
      emails: ['john@example.com'],
      vendors: [],
    }

    const summary = getSummary(data)

    expect(summary.title).toBe('Client Onboarding Complete')
    expect(summary.description).toBe("Here's a summary of the client information.")
    const firstSection = summary.sections[0]
    expect(firstSection?.title).toBe('Basic Information')
    expect(firstSection?.items[0]).toBe('John Doe & Jane Smith')
    expect(firstSection?.items[1]).toBe('Wedding Date: 2024-06-15')
  })

  it('generates summary with TBD when date is undecided', () => {
    const data: ClientOnboardingFormData = {
      'first-name': 'John',
      'last-name': 'Doe',
      'partner-first-name': 'Jane',
      'partner-last-name': 'Smith',
      'wedding-date': '',
      'date-undecided': true,
      emails: ['john@example.com'],
      vendors: [],
    }

    const summary = getSummary(data)

    const firstSection = summary.sections[0]
    expect(firstSection?.items[1]).toBe('Wedding Date: TBD')
  })

  it('includes email addresses in summary', () => {
    const data: ClientOnboardingFormData = {
      'first-name': 'John',
      'last-name': 'Doe',
      'partner-first-name': 'Jane',
      'partner-last-name': 'Smith',
      'wedding-date': '2024-06-15',
      'date-undecided': false,
      emails: ['john@example.com', 'jane@example.com'],
      vendors: [],
    }

    const summary = getSummary(data)

    const firstSection = summary.sections[0]
    expect(firstSection?.items).toContain('Email: john@example.com')
    expect(firstSection?.items).toContain('Email: jane@example.com')
  })

  it('includes vendor section when vendors are present', () => {
    const data: ClientOnboardingFormData = {
      'first-name': 'John',
      'last-name': 'Doe',
      'partner-first-name': 'Jane',
      'partner-last-name': 'Smith',
      'wedding-date': '2024-06-15',
      'date-undecided': false,
      emails: ['john@example.com'],
      vendors: [
        {
          name: 'Photographer Co',
          email: 'photographer@example.com',
          category: 'Photographer',
        },
      ],
    }

    const summary = getSummary(data)

    const vendorSection = summary.sections.find(section => section.title === 'Vendors')
    expect(vendorSection).toBeDefined()
    expect(vendorSection?.items[0]).toBe('Photographer Co · photographer@example.com · Photographer')
  })

  it('excludes vendor section when no vendors', () => {
    const data: ClientOnboardingFormData = {
      'first-name': 'John',
      'last-name': 'Doe',
      'partner-first-name': 'Jane',
      'partner-last-name': 'Smith',
      'wedding-date': '2024-06-15',
      'date-undecided': false,
      emails: ['john@example.com'],
      vendors: [],
    }

    const summary = getSummary(data)

    const vendorSection = summary.sections.find(section => section.title === 'Vendors')
    expect(vendorSection).toBeUndefined()
  })

  it('filters out empty emails from summary', () => {
    const data: ClientOnboardingFormData = {
      'first-name': 'John',
      'last-name': 'Doe',
      'partner-first-name': 'Jane',
      'partner-last-name': 'Smith',
      'wedding-date': '2024-06-15',
      'date-undecided': false,
      emails: ['john@example.com', ''],
      vendors: [],
    }

    const summary = getSummary(data)

    const firstSection = summary.sections[0]
    const emailItems = firstSection?.items.filter((item): item is string => typeof item === 'string' && item.startsWith('Email:'))
    expect(emailItems?.length).toBe(1)
  })
})
