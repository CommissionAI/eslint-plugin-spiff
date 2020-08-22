"use strict"
// Source: https://github.com/arcanis/eslint-plugin-arca/blob/master/lib/rules/import-align.js

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: "Require `from` keywords to be aligned.",
      category: "Stylistic Issues",
      recommended: true,
      url:
        "https://github.com/SpiffInc/eslint-plugin-spiff/blob/master/docs/rules/import-align.md",
    },
    type: "suggestion",
    fixable: "whitespace",
    schema: [
      {
        type: "object",

        properties: {
          collapseExtraSpaces: {
            type: "boolean",
          },

          minColumnWidth: {
            type: "number",
          },
        },

        additionalProperties: false,
      },
    ],
  },

  create(context) {
    //--------------------------------------------------------------------------
    // Read options, merge with defaults
    //--------------------------------------------------------------------------

    const defaultOptions = {
      collapseExtraSpaces: true,
      minColumnWidth: 0,
    }

    const options = Object.assign({}, defaultOptions, context.options[0])

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    function getFromKeyword(node) {
      if (node.type !== "ImportDeclaration") {
        return null
      }

      if (node.specifiers.length < 1) {
        return null
      }

      const sourceCode = context.getSourceCode()
      let token = sourceCode.getTokenAfter(
        node.specifiers[node.specifiers.length - 1]
      )

      while (token.type !== "Identifier" || token.value !== "from") {
        token = sourceCode.getTokenAfter(token)
      }

      return token
    }

    function reportUnalignedImportStatement(node, diff) {
      const sourceCode = context.getSourceCode()

      const fromKeyword = getFromKeyword(node)
      const previousToken = sourceCode.getTokenBefore(fromKeyword)

      context.report({
        node,
        loc: fromKeyword.loc.start,

        message: "Unaligned import statement.",

        fix(fixer) {
          if (diff < 0) {
            const index = sourceCode.getIndexFromLoc(previousToken.loc.end)

            return fixer.removeRange([index, index + Math.abs(diff)])
          }
          return fixer.insertTextAfter(previousToken, " ".repeat(diff))
        },
      })
    }

    function isSuitableImport(node) {
      return node.type === "ImportDeclaration" && node.specifiers.length >= 1
    }

    function findSurroundingImports(node) {
      const surroundingImports = [node]

      const parentBody = node.parent.body
      const nodeLocation = parentBody.indexOf(node)

      for (
        let t = nodeLocation - 1;
        t >= 0 && isSuitableImport(parentBody[t]);
        --t
      ) {
        surroundingImports.unshift(parentBody[t])
      }

      for (
        let t = nodeLocation + 1;
        t < parentBody.length && isSuitableImport(parentBody[t]);
        ++t
      ) {
        surroundingImports.push(parentBody[t])
      }

      return surroundingImports
    }

    function getLineInfo(node) {
      const sourceCode = context.getSourceCode()

      const fromToken = getFromKeyword(node)
      const fromTokenStart = fromToken.loc.start.column

      const prevToken = sourceCode.getTokenBefore(fromToken)
      const prevTokenEnd = prevToken.loc.end.column

      return {
        prevTokenEnd,
        fromTokenStart,
      }
    }

    function getAlignmentColumn(lines) {
      let alignmentColumn

      if (options.collapseExtraSpaces) {
        // use greatest endpoint of previous tokens as alignment column
        alignmentColumn = lines.reduce(
          (max, line) => Math.max(max, line.prevTokenEnd),
          0
        )

        // add 1 for the space
        alignmentColumn += 1
      } else {
        // use greatest start of from tokens as alignment column
        alignmentColumn = lines.reduce(
          (max, line) => Math.max(max, line.fromTokenStart),
          0
        )
      }

      // check if alignment column is lower than minColumnWidth, if defined
      if (options.minColumnWidth) {
        alignmentColumn = Math.max(alignmentColumn, options.minColumnWidth)
      }

      return alignmentColumn
    }

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
      ImportDeclaration(node) {
        if (!isSuitableImport(node)) {
          return
        }

        const surroundingImports = findSurroundingImports(node)

        // get the prevTokenEnd and fromTokenStart of all lines
        const lines = surroundingImports.map(getLineInfo)

        const alignmentColumn = getAlignmentColumn(lines)

        // get current line info
        const line = getLineInfo(node)

        // check alignment of current line
        if (line.fromTokenStart !== alignmentColumn) {
          reportUnalignedImportStatement(
            node,
            alignmentColumn - line.fromTokenStart
          )
        }
      },
    }
  },
}
