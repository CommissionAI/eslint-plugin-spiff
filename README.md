# eslint-plugin-spiff

Spiff's custom ESLint rules.

## Installation

```
$ yarn add --dev eslint CommissionAI/eslint-plugin-spiff@latest
```

```
$ npm install --save-dev eslint CommissionAI/eslint-plugin-spiff@latest
```

### Requirements

- Node.js v12.12.0 or newer versions.
- ESLint v5.16.0 or newer versions.

## Usage

Write your config file such as `.eslintrc.yml`.

```yml
plugins:
  - spiff
rules:
  spiff/import-align: error
```

See also [Configuring ESLint](https://eslint.org/docs/user-guide/configuring).

## Configs

- `spiff/recommended` ... enables the recommended rules.

## Rules

<!--RULE_TABLE_BEGIN-->
### Stylistic Issues

| Rule ID | Description |    |
|:--------|:------------|:--:|
| [spiff/import-align](./docs/rules/import-align.md) | Require `from` keywords to be aligned. | ⭐️✒️ |

<!--RULE_TABLE_END-->

## Semantic Versioning Policy

This plugin follows [Semantic Versioning](http://semver.org/) and [ESLint's Semantic Versioning Policy](https://github.com/eslint/eslint#semantic-versioning-policy).

## Changelog

- [GitHub Releases]()

## Contributing

Welcome your contribution!

See also [ESLint Contribution Guide](https://eslint.org/docs/developer-guide/contributing/).

### Development Tools

- `npm test` runs tests and measures coverage.
- `npm version <TYPE>` updates the package version. And it updates `lib/configs/recommended.js`, `lib/index.js`, and `README.md`'s rule table. See also [npm version CLI command](https://docs.npmjs.com/cli/version).
- `npm run add-rule <RULE_ID>` creates three files to add a new rule.
