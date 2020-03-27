import fs                    from 'fs'
import * as yaml             from 'js-yaml'
import * as core             from '@actions/core'
import * as github           from '@actions/github'
import ruleEngines           from './engines'
import { EngineConstructor } from './types'
import { RuleSet }           from './interfaces'
import Outputter             from './outputter'

export default class App {
  rulesets:  { [key: string]: RuleSet }
  engines:   { [key: string]: EngineConstructor[] }
  event:     string
  outputter: Outputter

  constructor() {
    this.rulesets  = this.loadRulesets()
    this.engines   = ruleEngines
    this.event     = github.context.eventName
    this.outputter = new Outputter
  }

  public async run() {
    let engines = this.engines[this.event]

    if (engines) {
      for (let constructor of engines) {
        // Run the engine
        let engine = new constructor()
        await engine.init(this.rulesets)
        engine.run()

        // Output the {ResultSet}s and summary if there are any
        if (engine.any()) {
          let results = engine.results()

          this.outputter.printSeparator(`\u29BE Running rulesets for ${engine.type}\n`)

          for (let resultset of engine.results()) {
            this.outputter.printResultSet(resultset)
            // Catch any failed {ResultSet}s here
            if (!resultset.pass()) this.fail()
          }

          this.outputter.printSummary(engine.results())
        }
      }
    }
    else {
      throw new Error(`Event type ${this.event} is not supported`)
    }
  }

  /**
   * Loads a rulesets.yaml file
   */
  private loadRulesets(): { [key: string]: RuleSet } {
    const file: string = core.getInput('rulesets')

    try {
      let fileContents = fs.readFileSync(file, 'utf8');
      let data         = yaml.safeLoad(fileContents);

      if (data.rulesets) {
        return data.rulesets
      }
      else {
        throw new Error(`Did not find field 'rulesets' in file ${file}`)
      }
    } catch (e) {
      throw e
    }
  }

  /**
   * Sets the process exit code to 1 so the check fails
   */
  private fail() {
    process.exitCode = core.ExitCode.Failure
  }
}