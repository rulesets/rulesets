import { Rule, Result } from '../rule'

export default abstract class CommitRule extends Rule {
  protected pass(params: { [key: string]: any }, subject: any): Result {
    const status:    string = 'PASS'
    const subjectId: string = subject.sha as string
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
    const subjectId: string = subject.sha as string
    return `Commit passed ${this.name} with params ${JSON.stringify(params)}`
  }

  protected fail(params: { [key: string]: any }, subject: any): Result {
    const status:    string = 'FAIL'
    const subjectId: string = subject.sha as string
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
    const subjectId: string = subject.sha as string
    return `Commit failed ${this.name} with params ${JSON.stringify(params)}`
  }
}
