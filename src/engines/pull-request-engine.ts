import * as github from '@actions/github'
import Engine      from './engine'
import rules       from '../rules/pulls'

/**
 * Runs pull type {Rule}s
 */
export class PullRequestEngine extends Engine {
  public type: string = 'pulls'

  constructor() {
    super(rules)
  }

  public async init(rulesets: { [key: string]: any }) {
    switch(github.context.eventName) {
      case 'pull_request':
        this.payload = new Array(github.context.payload.pull_request)
        break
      default:
        // Do nothing
    }

    // Load the rulesets and validate the rules exist
    if (rulesets['pulls']) this.rulesets = new Map(Object.entries(rulesets['pulls']))
    this.loader.validate(this.rulesets.keys())
  }
}
