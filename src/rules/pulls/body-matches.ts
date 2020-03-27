import PullRule from './pull-rule'

interface Params {
  pattern: string
}

export default class BodyMatches extends PullRule {
  protected name: string = 'body-matches'

  protected run(params: Params, subject: any): boolean {
    return RegExp(params.pattern).test(subject.body)
  }
}
