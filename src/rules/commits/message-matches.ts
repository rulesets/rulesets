import CommitRule from './commit-rule'

interface Params {
  pattern: string
}

export default class MessageMatches extends CommitRule {
  protected name: string = 'message-matches'

  protected run(params: Params, subject: any): boolean {
    const message: string = subject.commit.message as string
    return new RegExp(params.pattern).test(message)
  }

  protected passMessage(params: Params, subject: any): string {
    const message: string = subject.commit.message
    const match           = RegExp(params.pattern).exec(message)

    let begin: number = match!.index - 5
    let end:   number = match!.index + match![0].length + 5

    if (begin < 0) begin = 0

    return `Message matches regular expression /${params.pattern}/ at ...${message.slice(begin, end)}...`
  }

  protected failMessage(params: Params, subject: any): string {
    return `Message does not match regular expression /${params.pattern}/`
  }
}
