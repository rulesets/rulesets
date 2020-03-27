import PullRule from './pull-rule'

interface Params {
  min: number,
  max: number
}

export default class TitleLength extends PullRule {
  protected name: string = 'title-length'

  protected run(params: Params, subject: any): boolean {
    return subject.title.length >= params.min && subject.title.length <= params.max
  }

  protected failMessage(params: Params, subject: any): string {
    const length: number = subject.title.length

    if (length < params.min) {
      return `Title length must be at least ${params.min} but is only ${length}`
    }
    else {
      return `Title length must be no more than ${params.max} but is ${length}`
    }
  }
}
