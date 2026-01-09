// Shared utility functions

/**
 * Format a date to a localized string
 */
export function formatDate(date: Date, locale = 'en-US'): string {
  return new Intl.DateTimeFormat(locale).format(date);
}

/**
 * Simple delay utility for async operations
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Safe JSON parse that returns null on error
 */
export function safeJsonParse<T>(json: string): T | null {
  try {
    return JSON.parse(json) as T;
  } catch {
    return null;
  }
}
