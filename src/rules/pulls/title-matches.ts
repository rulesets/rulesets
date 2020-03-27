import PullRule from './pull-rule'

interface Params {
  pattern: string
}

export default class TitleMatches extends PullRule {
  protected name: string = 'title-matches'

  protected run(params: Params, subject: any): boolean {
    return RegExp(params.pattern).test(subject.title)
  }
}
