import { Result } from '../results'

export abstract class Rule {
  protected abstract name: string

  protected abstract run(params: { [key: string]: any }, subject: any): boolean
  protected abstract pass(params: { [key: string]: any }, subject: any): Result
  protected abstract passMessage(params: { [key: string]: any }, subject: any): string
  protected abstract fail(params: { [key: string]: any }, subject: any): Result
  protected abstract failMessage(params: { [key: string]: any }, subject: any): string

  public exec(params: { [key: string]: any }, subject: any): Result {
    return this.run(params, subject) ? this.pass(params, subject) : this.fail(params, subject)
  }
}

export { Result }
