import CommitRule from './commit-rule'

interface Params {
  min: number,
  max: number
}

export default class MessageLineLength extends CommitRule {
  protected name: string = 'message-line-length'

  protected run(params: Params, subject: any): boolean {
    const message: string   = subject.commit.message as string
    const lines:   string[] = message.split("\n")

    for (let line of lines) {
      let length: number = line.length

      if (length < params.min || length > params.max) {
        return false
      }
    }

    return true
  }
}
