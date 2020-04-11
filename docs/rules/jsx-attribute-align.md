# spiff/jsx-attribute-align
> Align the attributes of multi-line JSX elements.
> - ⭐️ This rule is included in `plugin:spiff/recommended` preset.
> - ✒️ The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) can automatically fix some of the problems reported by this rule.

## Rule Details

Correct:

```js
<MultiLine
  key    = "key"
  banana = {<Inner i="i" />}
/>
```

```js
<MultiLine
  key   = "key"
  count = {42}
/>
```

```js
<MultiLine
  id     = {id}
  banana = {<Inner i="i" />}
/>
```

Incorrect:

```js
<MultiLine
  key="key"
  banana={<Inner i="i" />}
/>
```

```js
<MultiLine
  key  ="key"
  count={42}
/>
```

```js
<MultiLine
  id =     {id}
  banana = {<Inner i="i" />}
/>
```

## Implementation

- [Rule source](../../lib/rules/jsx-attribute-align.js)
- [Test source](../../tests/lib/rules/jsx-attribute-align.js)
