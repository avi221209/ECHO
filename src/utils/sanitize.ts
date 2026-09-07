/**
 * Client-side sanitization utility to escape HTML characters and prevent XSS injection.
 * Never allows dangerouslySetInnerHTML on raw user-supplied text.
 */
export function sanitizeText(input: string, maxLength: number = 240): string {
  if (!input) return '';

  // Trim whitespace
  const trimmed = input.trim();

  // Escape special HTML characters
  const escaped = trimmed
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');

  // Enforce max length
  if (escaped.length > maxLength) {
    return escaped.slice(0, maxLength);
  }

  return escaped;
}

/**
 * Returns raw display-safe text without HTML entities for standard React string rendering.
 * React safely escapes standard children, but this trims, filters invisible control characters,
 * and caps length.
 */
export function cleanUserInput(input: string, maxLength: number = 240): string {
  if (!input) return '';

  // Remove zero-width spaces and abnormal ASCII control chars (except standard newlines/tabs)
  const cleaned = input
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    // eslint-disable-next-line no-control-regex
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

  return cleaned.trim().slice(0, maxLength);
}
