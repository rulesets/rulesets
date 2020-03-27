import c                     from 'ansi-colors'
import { Result, ResultSet } from './results'

/**
 * The {Outputter} class is responsible for pretty printing output to the
 * GitHub Workflow console. It leads a simple life.
 */
export default class Outputter {
  /**
   * Pretty prints each {ResultSet} to the console and a summary of
   * the number of passes and fails.
   * 
   * TODO: Add an option for 'verbose' printing
   * @param resultsets
   */
  public printResultSet(resultset: ResultSet) {
    let set = resultset.hash()

    // Print the status header for the {ResultSet}
    set.pass ?
    console.log(c.green.bold(`\u2713 ${set.status}`), c.green(`${set.rule} with range ${set.ruleset.range}`)) :
    console.log(c.red.bold(`\u2A2F ${set.status}`),   c.red(`${set.rule} with range ${set.ruleset.range}`))

    // TODO: Is there a better way to insert an empty line (other than \n above)?
    console.log()

    // Print the optional error if the ruleset failed
    if (!set.pass && set.ruleset.error) {
      this.printIndented(c.gray.italic(set.ruleset.error.trim()))
      console.log()
    }

    // Print the individual results
    for (let result of set.results) this.printResult(result)
  }

  /**
   * Pretty prints an individual {Result} to the console.
   * 
   * TODO: Add an option for 'verbose' printing
   * @param result
   */
  public printResult(result: Result) {
    let res = result.hash()

    // Print the header for the result
    res.pass ?
    this.printIndented(c.green(`${res.status} ${res.subjectId}`)) :
    this.printIndented(c.red(`${res.status} ${res.subjectId}`))

    // Print the result message only if the rule failed
    // TODO: Verbose printing should always display the message
    if (!res.pass) this.printIndented(`${res.message}`)

    console.log()
  }

  /**
   * Prints a summary indicating the number of {ResultSet}s that passed
   * and failed.
   * @param resultsets 
   */
  public printSummary(resultsets: ResultSet[]) {
    let pass:   number = 0
    let fail:   number = 0
    let plural: string = resultsets.length == 1 ? '' : 's'

    for (let resultset of resultsets) {
      resultset.pass() ? pass++ : fail++
    }

    console.log(`\u28FF Ran ${resultsets.length} ruleset${plural},`,
                c.green(`${pass} passed`),
                'and',
                c.red(`${fail} failed\n`)
                )
  }

  /**
   * Prints a separator. Neat.
   */
  public printSeparator(message: string) {
    console.log(c.cyan(message))
  }

  /**
   * Indents each line of a string by the indicated number of tabs.
   * @param message
   * @param level 
   */
  private printIndented(message: string, level: number = 1) {
    const indent:  string = "\t".repeat(level)

    for (let line of message.split("\n")) {
      console.log(`${indent}${line}`)
    }
  }
}
