import { PullRequestEngine } from './pull-request-engine'
import { CommitEngine }      from './commit-engine'

/**
 * Export a map of EventTypes to a list of Engines
 * For example, the 'pull_request' event allows for applying {Rule}s to
 * pulls and commits. Thus, the {App} will need access to the {PullRequestEngine}
 * and the {CommitEngine}.
 * 
 * A full list of event types can be found in the GitHub documenation:
 * https://developer.github.com/v3/activity/events/types/
 */
export default {
  'pull_request': [PullRequestEngine, CommitEngine],
  'push':         [CommitEngine]
}
