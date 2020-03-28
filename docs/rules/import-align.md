# spiff/import-align
> Require `from` keywords to be aligned.
> - ⭐️ This rule is included in `plugin:spiff/recommended` preset.
> - ✒️ The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) can automatically fix some of the problems reported by this rule.

## Rule Details

This rule is based on the [arca/import-align](https://github.com/arcanis/eslint-plugin-arca/blob/master/docs/rules/import-align.md) plugin. It differs in that it affects both single and multiline imports and it defaults `collapseExtraSpaces` to `true`.

The following patterns are considered warnings:

```js
import foo from 'foo';
import supercalifragilisticexpialidocious from 'supercalifragilisticexpialidocious';
```

The following patterns are not warnings:

```js
import foo                                from 'foo';
import supercalifragilisticexpialidocious from 'supercalifragilisticexpialidocious';
import {
    SOME_KEY,
    SOME_OTHER_KEY
}                                         from 'config';
```

## Options

### `collapseExtraSpaces`

#### Defaults to `true`.

If false, the imports will be allowed to have any amount of spaces between the symbol list and the `from` keyword except for the minimum required to make this rule pass.

The following patterns are not considered warnings when `collapseExtraSpaces` is off:

```js
import foo       from 'foo';
import hello     from 'hello';
```

```js
import foo   from 'foo';
import hello from 'hello';
```
### `minColumnWidth`

#### Off by default.

The following patterns is not considered a warning when `minColumnWidth` is set to 20:

```js
import foo          from 'foo';
import bar          from 'bar';
```

## Implementation

- [Rule source](../../lib/rules/import-align.js)
- [Test source](../../tests/lib/rules/import-align.js)
