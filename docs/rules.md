# Rules

- [commits](#commits)
  - [message-length](#message-length)
  - [message-line-length](#message-line-length)
  - [message-matches](#message-matches)
  - [message-matches-n](#message-matches-n)
  - [message-max-length](#message-max-length)
  - [message-max-line-length](#message-max-line-length)
  - [message-min-length](#message-min-length)
  - [message-min-line-length](#message-min-line-length)
- [pulls](#pulls)
  - [body-length](#body-length)
  - [body-matches](#body-matches)
  - [title-length](#title-length)
  - [title-matches](#title-matches)


## commits

The following rules are available for commits.


### `message-length`

Specify a minimum and maximum length for a commit message.

#### Parameters

- **`min`** The minimum number of characters, inclusive.
- **`max`** The maximum number of characters, inclusive.

#### Usage

```yaml
rulesets:
  commits:
    message-length:
      range: always
      params:
        min: 1
        max: 1000
```


### `message-line-length`

Specify a minimum and maximum length for each line in a commit message.

#### Parameters

- **`min`** The minimum number of characters, inclusive.
- **`max`** The maximum number of characters, inclusive.

#### Usage

```yaml
rulesets:
  commits:
    message-line-length:
      range: always
      params:
        min: 1
        max: 120
```


### `message-matches`

Test a commit message against a regular expression.

#### Parameters

- **`pattern`** A regular expression to test against. Do not include opening and closing slashes `/`.

#### Usage

```yaml
rulesets:
  commits:
    message-matches:
      range: always
      params:
        pattern: '!(feature|bug)'
```

### `message-max-length`

Specify a maximum length for a commit message.

#### Parameters

- **`max`** The maximum number of characters, inclusive.

#### Usage

```yaml
rulesets:
  commits:
    message-max-length:
      range: always
      params:
        max: 1000
```


### `message-matches-n`

Test a commit message against a set of regular expressions, ensuring that it matches exactly _n_
of the expressions.

#### Parameters

- **`count`** The number of regular expressions the message must match.
- **`patterns`** A list of regular expression to test against. Do not include opening and closing 
  slashes `/`.

#### Usage

```yaml
rulesets:
  commits:
    message-matches-n:
      range: always
      params:
        count: 1
        patterns:
          - '!(feature|bug) [a-zA-Z0-9]+'
          - '!(removal|deprecation)'
```

### `message-max-length`

Specify a maximum length for a commit message.

#### Parameters

- **`max`** The maximum number of characters, inclusive.

#### Usage

```yaml
rulesets:
  commits:
    message-max-length:
      range: always
      params:
        max: 1000
```


### `message-max-line-length`

Specify a maximum length for each line in a commit message.

#### Parameters

- **`max`** The maximum number of characters, inclusive.

#### Usage

```yaml
rulesets:
  commits:
    message-max-line-length:
      range: always
      params:
        max: 120
```

### `message-min-length`

Specify a minimum length for a commit message.

#### Parameters

- **`min`** The minimum number of characters, inclusive.

#### Usage

```yaml
rulesets:
  commits:
    message-min-length:
      range: always
      params:
        min: 1
```


### `message-min-line-length`

Specify a minimum length for each line in a commit message.

#### Parameters

- **`min`** The minimum number of characters, inclusive.

#### Usage

```yaml
rulesets:
  commits:
    message-min-line-length:
      range: always
      params:
        min: 1
```


## pulls

The following rules are available for pull requests.


### `body-length`

Specify a minimum and maximum length for a pull request's body.

#### Parameters

- **`min`** The minimum number of characters, inclusive.
- **`max`** The maximum number of characters, inclusive.

#### Usage

```yaml
rulesets:
  pulls:
    body-length:
      range: always
      params:
        min: 1
        max: 500
```


### `body-matches`

Test a pull request's body against a regular expression.

#### Parameters

- **`pattern`** A regular expression to test against. Do not include opening and closing slashes `/`.

#### Usage

```yaml
rulesets:
  pulls:
    body-matches:
      range: always
      params:
        pattern: '!(feature|bug)'
```


### `title-length`

Specify a minimum and maximum length for a pull request's title.

#### Parameters

- **`min`** The minimum number of characters, inclusive.
- **`max`** The maximum number of characters, inclusive.

#### Usage

```yaml
rulesets:
  pulls:
    title-length:
      range: always
      params:
        min: 1
        max: 30
```


### `title-matches`

Test a pull request's title against a regular expression.

#### Parameters

- **`pattern`** A regular expression to test against. Do not include opening and closing slashes `/`.

#### Usage

```yaml
rulesets:
  pulls:
    title-matches:
      range: always
      params:
        pattern: '^\(GH-[0-9]+\)'
```
