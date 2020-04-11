"use strict"

const rule = require("../../../lib/rules/import-align")
const RuleTester = require("eslint").RuleTester

const parserOptions = { sourceType: "module", ecmaVersion: 2015 }

const ruleTester = new RuleTester({ parserOptions })

ruleTester.run("import-align", rule, {
  valid: [
    `
import foo from 'foo';
import bar from 'bar';
`,
    `
import foo                                from 'foo';
import supercalifragilisticexpialidocious from 'supercalifragilisticexpialidocious';
`,
    `
import foo                                from 'foo';
import supercalifragilisticexpialidocious from 'supercalifragilisticexpialidocious';
import {
    A,
    B
}                                         from 'foo';
`,
    {
      code: `
import foo          from 'foo';
import bar          from 'bar';
`,
      options: [{ minColumnWidth: 20 }],
    },
    {
      code: `
import supercalifragilisticexpialidocious from 'foo';
import bar                                from 'bar';
`,
      options: [{ minColumnWidth: 20 }],
    },
    {
      code: `
import foo    from 'foo';
import bar    from 'bar';
`,
      options: [{ collapseExtraSpaces: false }],
    },
  ],

  // --------------------------------------------------------------------------------
  invalid: [
    {
      code: `
import foo        from 'foo';
import { Banana } from 'eat/Banana';
import {
    A,
    B
} from 'foo';
`,
      output: `
import foo        from 'foo';
import { Banana } from 'eat/Banana';
import {
    A,
    B
}                 from 'foo';
`,
      errors: [{ message: "Unaligned import statement." }],
    },
    {
      code: `
import foo        from 'foo';
import { Banana } from 'eat/Banana';
import {
    A,
    B
}                            from 'foo';
`,
      output: `
import foo        from 'foo';
import { Banana } from 'eat/Banana';
import {
    A,
    B
}                 from 'foo';
`,
      errors: [{ message: "Unaligned import statement." }],
    },
    {
      code: `
import foo                                    from 'foo';
import supercalifragilisticexpialidocious from 'supercalifragilisticexpialidocious';
`,
      output: `
import foo                                from 'foo';
import supercalifragilisticexpialidocious from 'supercalifragilisticexpialidocious';
`,
      errors: [{ message: "Unaligned import statement." }],
    },
    {
      code: `
import foo from 'foo';
import supercalifragilisticexpialidocious from 'supercalifragilisticexpialidocious';`,
      output: `
import foo                                from 'foo';
import supercalifragilisticexpialidocious from 'supercalifragilisticexpialidocious';`,
      errors: [{ message: "Unaligned import statement." }],
    },
    {
      code: `
import foo from 'foo';
import bar                                from 'bar';
import supercalifragilisticexpialidocious from 'supercalifragilisticexpialidocious';`,
      output: `
import foo                                from 'foo';
import bar                                from 'bar';
import supercalifragilisticexpialidocious from 'supercalifragilisticexpialidocious';`,
      errors: [{ message: "Unaligned import statement." }],
    },
    {
      code: `
import foo   from 'foo';
import bar   from 'bar';
`,
      output: `
import foo from 'foo';
import bar from 'bar';
`,
      errors: [
        { message: "Unaligned import statement." },
        { message: "Unaligned import statement." },
      ],
    },
    {
      code: `
import foo    from 'foo';
import bar   from 'bar';
`,
      output: `
import foo from 'foo';
import bar from 'bar';
`,
      errors: [
        { message: "Unaligned import statement." },
        { message: "Unaligned import statement." },
      ],
    },
    {
      code: `
import foo    from 'foo';
import bar from 'bar';
`,
      output: `
import foo from 'foo';
import bar from 'bar';
`,
      errors: [{ message: "Unaligned import statement." }],
    },
    {
      code: `
import { foo }    from 'foo';
import bar       from 'bar';
`,
      output: `
import { foo } from 'foo';
import bar     from 'bar';
`,
      errors: [
        { message: "Unaligned import statement." },
        { message: "Unaligned import statement." },
      ],
    },
    {
      code: `
import { foo }    from 'foo';
import bar     from 'bar';
`,
      output: `
import { foo } from 'foo';
import bar     from 'bar';
`,
      errors: [{ message: "Unaligned import statement." }],
    },
    {
      code: `
import foo       from 'foo';
import bar       from 'bar';
`,
      output: `
import foo          from 'foo';
import bar          from 'bar';
`,
      options: [{ minColumnWidth: 20 }],
      errors: [
        { message: "Unaligned import statement." },
        { message: "Unaligned import statement." },
      ],
    },
    {
      code: `
import foo              from 'foo';
import bar              from 'bar';
`,
      output: `
import foo          from 'foo';
import bar          from 'bar';
`,
      options: [{ minColumnWidth: 20 }],
      errors: [
        { message: "Unaligned import statement." },
        { message: "Unaligned import statement." },
      ],
    },
  ],
})
