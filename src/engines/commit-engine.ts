import * as core   from '@actions/core'
import * as github from '@actions/github'
import Engine      from './engine'
import rules       from '../rules/commits'

export class CommitEngine extends Engine {
  public type: string = 'commits'

  constructor() {
    super(rules)
  }

  public async init(rulesets: { [key: string]: any }): Promise<void> {
    switch(github.context.eventName) {
      case 'push':
        this.payload = Array.from(github.context.payload.commits)
        break
      case 'pull_request':
        this.payload = await this.getCommits()
        break
      default:
        // Do nothing
    }

    // Load the rulesets and validate the rules exist
    if (rulesets['commits']) this.rulesets = new Map(Object.entries(rulesets['commits']))
    this.loader.validate(this.rulesets.keys())
  }

  private async getCommits(): Promise<Array<any>> {
    // Create a new octokit client to retrieve commits for this pull
    const token  = core.getInput('token', { required: true })
    const client = new github.GitHub(token)

    // Get the repo information from the process environment
    const [owner, repo] = process.env.GITHUB_REPOSITORY?.split('/') as string[]

    // Request data from the client
    const { data: commits } = await client.pulls.listCommits({
      owner: owner,
      repo: repo,
      pull_number: github.context.payload.pull_request?.number as number
    })

    return Array.from(commits)
  }
}
