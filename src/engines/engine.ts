import { RuleLoader }      from '../loaders'
import { RuleConstructor } from '../types'
import { RuleSet }         from '../interfaces'
import { ResultSet }       from '../results'

/**
 * The {Engine} class is responsible for running a set of {Rule}s
 */
export default abstract class Engine {
  public abstract type: string
  protected loader:     RuleLoader
  protected rulesets:   Map<string, RuleSet>
  protected resultsets: Array<ResultSet>
  protected payload:    Array<any>

  constructor(rules: { [key: string]: RuleConstructor }) {
    this.loader     = new RuleLoader(rules)
    this.rulesets   = new Map
    this.resultsets = new Array
    this.payload    = new Array
  }

  /**
   * Each {Engine} must implement its own init method, as this is where the
   * payload and {RuleSet}s are loaded
   * @param rulesets 
   */
  public abstract async init(rulesets: { [key: string]: any }): Promise<void>

  /**
   * Loops over the {RuleSet}s loaded by the {Engine} and runs each {Rule}
   * against each subject from the payload. {Result}s from the run are added
   * to a {ResultSet} which is later used by the {App} to determine whether
   * the payload passed and output the results.
   */
  public run() {
    for (const [name, ruleset] of this.rulesets.entries()) {
      let resultset = new ResultSet(name, ruleset, this.payload)
      let rule      = this.loader.load(name)

      for (let subject of this.payload) {
        let result = rule.exec(ruleset.params, subject)
        resultset.push(result)
      }

      this.resultsets.push(resultset)
    }
  }
  
  /**
   * Returns true if there are any {ResultSet}s
   */
  public any(): boolean {
    return this.resultsets.length > 0
  }

  /**
   * Returns the list of {ResultSet}s
   */
  public results(): ResultSet[] {
    return this.resultsets
  }
}