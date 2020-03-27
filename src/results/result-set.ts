import { Result }  from './result'
import { RuleSet } from '../interfaces'

import * as color from 'ansi-colors'
import dedent      from 'dedent'

/**
 * A {ResultSet} is used to collect a list of {Result}s and determine
 * whether the {RuleSet} passed or failed based on a given range.
 */
export class ResultSet {
  public  rule:    string
  private ruleset: RuleSet
  private subject: any
  private results: Result[]

  constructor(rule: string, ruleset: RuleSet, subject: any) {
    this.rule    = rule
    this.ruleset = ruleset
    this.subject = subject
    this.results = []
  }

  /**
   * Returns the number of results.
   */
  public count(): number {
    return this.results.length
  }

  /**
   * Returns true if there are no results.
   */
  public empty(): boolean {
    return this.count() == 0
  }

  /**
   * Pushes a {Result} to the {ResultSet}
   */
  public push(result: Result) {
    this.results.push(result)
  }

  /**
   * Returns true if the results passed based on the range.
   *    'always' - All results passed
   *    'once'   - At least one result passed
   *    'never'  - No results passed
   */
  public pass(): boolean {
    const range: string = this.ruleset.range

    switch(range) {
      case 'always':
        return this.countPasses() == this.count()
      case 'once':
        return this.countPasses() >= 1
      case 'never':
        return this.countPasses() == 0
      default:
        return false
    }
  }

  /**
   * Returns a string indicating whether the {ResultSet} passed or failed.
   */
  public status(): string {
    return this.pass() ? 'PASS' : 'FAIL'
  }

  public hash() {
    return {
      pass:    this.pass(),
      status:  this.status(),
      rule:    this.rule,
      ruleset: this.ruleset,
      results: this.results
    }
  }

  /**
   * Returns the number of results that have a 'PASS' status
   */
  private countPasses(): number {
    let count: number = 0

    for (let result of this.results) {
      if (result.pass()) count++
    }

    return count
  }
}
