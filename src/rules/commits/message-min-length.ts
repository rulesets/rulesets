import CommitRule from './commit-rule'

interface Params {
  min: number
}

export default class MessageMinLength extends CommitRule {
  protected name: string = 'message-min-length'

  protected run(params: Params, subject: any): boolean {
    const message: string = subject.commit.message as string

    return  message.length >= params.min
  }
}
