import { Rule, Result } from '../rule'

export default abstract class PullRule extends Rule {
  protected pass(params: { [key: string]: any }, subject: any): Result {
    const status:    string = 'PASS'
    const subjectId: string = subject.number as string
    const message:   string = this.passMessage(params, subject)

    return new Result(
      this.name,
      status,
      message,
      subjectId,
      subject
    )
  }

  protected passMessage(params: { [key: string]: any }, subject: any): string {
    const subjectId: string = subject.number as string
    return `Pull passed ${this.name} with params ${JSON.stringify(params)}`
  }

  protected fail(params: { [key: string]: any }, subject: any): Result {
    const status:    string = 'FAIL'
    const subjectId: string = subject.number as string
    const message:   string = this.failMessage(params, subject)

    return new Result(
      this.name,
      status,
      message,
      subjectId,
      subject
    )
  }

  protected failMessage(params: { [key: string]: any }, subject: any): string {
    const subjectId: string = subject.number as string
    return `Pull failed ${this.name} with params ${JSON.stringify(params)}`
  }
}
