import CommitRule from './commit-rule'

interface Params {
  min: number,
  max: number
}

export default class MessageLength extends CommitRule {
  protected name: string = 'message-length'

  protected run(params: Params, subject: any): boolean {
    const message: string = subject.commit.message as string

    return  message.length >= params.min && message.length <= params.max
  }
}
