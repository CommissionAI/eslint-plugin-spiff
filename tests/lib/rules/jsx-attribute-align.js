"use strict"

const { RuleTester } = require("eslint")
const rule = require("../../../lib/rules/jsx-attribute-align")

const parserOptions = {
  sourceType: "module",
  ecmaVersion: 2015,
  ecmaFeatures: {
    jsx: true,
  },
}

new RuleTester({ parserOptions }).run("jsx-attribute-align", rule, {
  valid: [
    `<Component key={key} />`,

    `<Component key={key}></Component>`,

    `<Component {...spread} boolean key={key} attr="value" />`,

    `<Component key={key}
     />`,

    `<MultiLine
       a = {a}
     />`,

    `<MultiLine
       a = {a}
       b = {b}
     />`,

    `<MultiLine
       a = {a}
       b = {b}
       boolean
       {...spread}
     />`,

    `<MultiLine
       a            = {a}
       someLongProp = {<Inner i="i" />}
     />`,
  ],

  // --------------------------------------------------------------------------------

  invalid: [
    {
      code: `
<MultiLine
  a={a}
></MultiLine>`,
      output: `
<MultiLine
  a = {a}
></MultiLine>`,
      errors: [{ message: "Unaligned import statement." }],
    },

    {
      code: `
<MultiLine
  b={b}
  c={c}
  boolean
  {...spread}
/>`,
      output: `
<MultiLine
  b = {b}
  c = {c}
  boolean
  {...spread}
/>`,
      errors: [
        { message: "Unaligned import statement." },
        { message: "Unaligned import statement." },
      ],
    },

    {
      code: `
<MultiLine
  d =      {d}
  banana = {<Inner i="i" />}
/>`,
      output: `
<MultiLine
  d      = {d}
  banana = {<Inner i="i" />}
/>`,
      errors: [{ message: "Unaligned import statement." }],
    },

    {
      code: `
<MultiLine
  e={e}
  someLongProp={<Inner i="i" />}
/>`,
      output: `
<MultiLine
  e            = {e}
  someLongProp = {<Inner i="i" />}
/>`,
      errors: [
        { message: "Unaligned import statement." },
        { message: "Unaligned import statement." },
      ],
    },

    {
      code: `
<MultiLine
  f   ={f}
  blah={<Inner i="i" />}
/>`,
      output: `
<MultiLine
  f    = {f}
  blah = {<Inner i="i" />}
/>`,
      errors: [
        { message: "Unaligned import statement." },
        { message: "Unaligned import statement." },
      ],
    },
  ],
})
