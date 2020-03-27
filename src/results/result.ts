import stripIndent from 'strip-indent'

/**
 * A {Result} is returned from a {Rule} and describes whether a subject
 * follows a rule. It has a few methods to determine whether the rule
 * passed or failed and to print a human-readable result.
 */
export class Result {
  private rule:      string
  private status:    string
  private message:   string
  private subjectId: string
  private subject:   any

  constructor(
    rule:      string,
    status:    string,
    message:   string,
    subjectId: string,
    subject:   any
  ) {
    this.rule      = rule
    this.status    = status
    this.message   = message
    this.subjectId = subjectId
    this.subject   = subject
  }

  /**
   * Returns true if the rule passed
   */
  public pass(): boolean {
    return this.status == 'PASS'
  }

  /**
   * Returns a string with the result status for the subject
   * 
   *    PASS c33bd380a60d5349dbb0bdd7caf5a09b62ce5db7
   */
  public short(): string {
    return stripIndent(`
    ${this.status} ${this.subjectId}
    `)
  }

  /**
   * Returns a string with the result status for the subject,
   * the rule name, and the message returned by the rule
   * 
   *    FAIL c33bd380a60d5349dbb0bdd7caf5a09b62ce5db7 for message-length
   *    Message length should be a minimum of 1 character and a maximum of 100
   *    charcters, but had a length of 200 characters.
   */
  public long(): string {
    return stripIndent(`
    ${this.status} ${this.subjectId} for ${this.rule}
         ${this.message}
    `)
  }

  /**
   * Returns a map of attributes for the {Result}
   */
  public hash(): { [key: string]: any } {
    return {
      pass:      this.pass(),
      status:    this.status,
      rule:      this.rule,
      message:   this.message,
      subjectId: this.subjectId,
      subject:   this.subject
    }
  }
}
