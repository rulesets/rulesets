import { Rule }            from '../rules'
import { RuleConstructor } from '../types'

/**
 * This is a lightweight class that is responsible for loading a specified rule
 * from a map of names to {Rule}s
 */
export class RuleLoader {
  private context: { [key: string]: RuleConstructor }

  constructor(context: { [key: string]: RuleConstructor }) {
    this.context = context
  }

  public load(name: string): Rule {
    return new this.context[name]()
  }

  public validate(names: IterableIterator<string>) {
    for (let name of names) {
      if (! this.context[name]) {
        throw new Error(`Unknown rule ${name}; valid rules are:\n${Object.keys(this.context).join("\n")}`)
      }
    }
  }
}
