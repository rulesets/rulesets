/**
 * Interfaces
 */
export interface RuleSet {
  range:  'always' | 'never' | 'once',
  params: { [key: string]: any },
  error?: string
}
