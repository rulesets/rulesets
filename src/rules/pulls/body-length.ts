import PullRule from './pull-rule'

interface Params {
  min: number,
  max: number
}

export default class BodyLength extends PullRule {
  protected name: string = 'body-length'

  protected run(params: Params, subject: any): boolean {
    return subject.body.length >= params.min && subject.body.length <= params.max
  }

  protected failMessage(params: Params, subject: any): string {
    const length: number = subject.body.length

    if (length < params.min) {
      return `Body length must be at least ${params.min} but is only ${length}`
    }
    else {
      return `Body length must be no more than ${params.max} but is ${length}`
    }
  }
}
