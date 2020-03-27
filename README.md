# Rulesets action

Validate pull requests and commits against a list of rules.


## Contents

1. [About](#about)
1. [Inputs](#inputs)
1. [Supported rules](#supported-rules)
1. [Configuring rules](#configuring-rules)
1. [Usage](#usage)



## About

It's important to understand a few terms before getting started with the Rulesets action.

- `event`

  The name of a GitHub event that triggers a workflow run. [View events that trigger workflows]
  (https://help.github.com/en/actions/reference/events-that-trigger-workflows)

- `payload`

  When an event is triggered, a payload containing information about the event is created.
  This payload includes information about the event, such as the SHA for a commit or the author
  of a pull request.

- `subject`

  An individual portion of a payload that is tested against a rule. For example, a pull request
  is a `payload`, while each `commit` is a subject tested against a rule.

- `type`

  Rules act on specific types of payloads. For example, a `title-matches` rule runs on pull
  request payloads, while a `message-matches` rule runs on commit payloads.

- `ruleset`

  A ruleset is a rule and a map of configuration for the rule.

When an event triggers a GitHub workflow, it contains a payload with information about the event.
For example, when a user opens a pull request the `pull_request` event is triggered and creates
a payload with information about the pull request, including its title, body, and more.

The Ruleset action lets you define a set of rules that these payloads must follow so you can
validate them automatically. Each rule accepts a map of [configuration options](#configuring-rules), 
including a map of parameters, a range of subjects that must pass the rule, and an optional
error message.

Setting up the Rulesets action requires creating a workflow file that defines the `event` the
action runs on and a `rulesets.yaml` file that defines the `types` of `rules` to run. These
files would look like so:

### `.github/rulesets.yaml`

```yaml
rulesets:
  <type>:
    <rule>:
      range:
      params:
      error:
    <rule>:
      range:
      params:
      error:
```

### `.github/workflows/rulesets.yaml`

```yaml
name: Rulesets

on:
  - <event>

...
```


## Supported rules

The Rulesets action supports the following events and each event supports specific types of rules.

- **`pull_request`**

  - [commits](docs/rules.md#commits)
  - [pulls](docs/rules.md#pulls)

- **`push`**

  - [commits](docs/rules#commits)


## Configuring rules

Each rule accepts the same configuration options.

### `error`

_Optional_

An error message to display when a payload fails a rule. Typically used to help a user understand
_why_ a rule failed and corrective measures to take.

### `params`

_Required_

A list of parameters that the rule uses to determine if a subject passes the rule. Each rule
has its own [specific parameters](docs/rules.md)

### `range`

_Required_

The range of the payload that the rule applies to. This is used to determine whether the payload 
passes the rule or not. Accepts one of three values.

- `always`

  All subjects must pass the rule for the payload to pass. For example, all commit messages in a 
  pull request must pass a rule for the pull request to pass.

- `never`

  All subjects must fail the rule for the payload to pass. For example, all commit messages in a 
  pull request must fail a rule for the pull request to pass.

- `once`

  At least one subject must pass the rule for the payload to pass. For example, one commit message
  in a pull request must pass a rule for the pull request to pass.


## Inputs

The Rulesets action accepts the following inputs in the workflow file.

### `rulesets`

Path to a `yaml` file containing a list of rules. Defaults to `./.github/rulesets.yaml`.

### `token`

**Required.** GitHub authentication token.


## Usage

To use this action you will need to create a `rulesets.yaml` file containing a list of rules
and a workflow.

### `.github/rulesets.yaml`

```yaml
---
rulesets:
  pulls:
    title-length:
      range: always
      params:
        min: 1
        max: 30
      error: |
        Pull request titles must be between 1 and 30 characters
        in length.
  commits:
    message-max-length:
      range: always
      params:
        max: 500
      error: |
        Commit messages should be no more than 500 characters
        in length.
```

### `.github/workflows/rulesets.yaml`

```yaml
---
name: Rulesets

on:
  pull_request:
    type: [opened, reopened, edited]

jobs:

  pulls:
    name: Pulls
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v1
      - name: Check commits
        uses: rulesets/rulesets@v1
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
```
