import CommitRule from './commit-rule'

interface Params {
  max: number
}

export default class MessageMaxLineLength extends CommitRule {
  protected name: string = 'message-max-line-length'

  protected run(params: Params, subject: any): boolean {
    const message: string   = subject.commit.message as string
    const lines:   string[] = message.split("\n")

    for (let line of lines) {
      let length: number = line.length

      if (length > params.max) {
        return false
      }
    }

    return true
  }
}
