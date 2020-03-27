import CommitRule from './commit-rule'

interface Params {
  max: number
}

export default class MessageMaxLength extends CommitRule {
  protected name: string = 'message-max-length'

  protected run(params: Params, subject: any): boolean {
    const message: string = subject.commit.message as string

    return  message.length <= params.max
  }
}
