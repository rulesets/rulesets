import CommitRule from './commit-rule'

interface Params {
  count:    number
  patterns: string[]
}

export default class MessageMatchesN extends CommitRule {
  protected name: string = 'message-matches-n'

  protected run(params: Params, subject: any): boolean {
    const message: string = subject.commit.message as string
    let count:     number = 0

    for (let pattern of params.patterns) {
      if (new RegExp(pattern).test(message)) count++
    }

    return count == params.count
  }

  protected passMessage(params: Params, subject: any): string {
    const message: string = subject.commit.message
    const plural:  string = params.count == 1 ? '' : 's'

    return `Message matches ${params.count} regular expression${plural} in /${params.patterns.join('/, /')}/`
  }

  protected failMessage(params: Params, subject: any): string {
    const plural: string = params.count == 1 ? '' : 's'
    return `Message does not match ${params.count} regular expression${plural} in /${params.patterns.join('/, /')}/`
  }
}
