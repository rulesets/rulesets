import CommitRule from './commit-rule'

interface Params {
  min: number
}

export default class MessageMinLineLength extends CommitRule {
  protected name: string = 'message-min-line-length'

  protected run(params: Params, subject: any): boolean {
    const message: string   = subject.commit.message as string
    const lines:   string[] = message.split("\n")

    for (let line of lines) {
      let length: number = line.length

      if (length < params.min) {
        return false
      }
    }

    return true
  }
}
