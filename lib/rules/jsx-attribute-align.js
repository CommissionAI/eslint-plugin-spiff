"use strict"

module.exports = {
  meta: {
    docs: {
      description: "Align the attributes of multi-line JSX elements.",
      category: "Stylistic Issues",
      recommended: true,
      url:
        "https://github.com/CommissionAI/eslint-plugin-spiff/blob/master/docs/rules/jsx-align.md",
    },
    type: "suggestion",
    fixable: "whitespace",
  },

  create(context) {
    const sourceCode = context.getSourceCode()

    //--------------------------------------------------------------------------
    // Helpers
    //--------------------------------------------------------------------------

    function getEqualToken(node) {
      return sourceCode.getTokenAfter(node.name)
    }

    function reportUnaligned(node, alignmentColumn, isFixable) {
      const nameToken = node.name
      const equalToken = getEqualToken(node)
      const equalTokenStart = equalToken.loc.start
      const diffBefore = alignmentColumn - equalTokenStart.column
      const nextTokenStart = node.value.loc.start
      const diffAfter = equalTokenStart.column + 2 - nextTokenStart.column

      context.report({
        node,
        loc: equalTokenStart,

        message: "Unaligned import statement.",

        fix(fixer) {
          if (!isFixable) return null

          const fixes = []

          // before
          if (diffBefore < 0) {
            const index = sourceCode.getIndexFromLoc(nameToken.loc.end)

            fixes.push(fixer.removeRange([index, index + Math.abs(diffBefore)]))
          } else if (diffBefore > 0) {
            fixes.push(fixer.insertTextAfter(nameToken, " ".repeat(diffBefore)))
          }

          // after
          if (diffAfter < 0) {
            const index = sourceCode.getIndexFromLoc(equalToken.loc.end)

            fixes.push(fixer.removeRange([index, index + Math.abs(diffAfter)]))
          } else if (diffAfter > 0) {
            fixes.push(fixer.insertTextAfter(equalToken, " ".repeat(diffAfter)))
          }

          return fixes
        },
      })
    }

    function isMultiLine(jsxElement) {
      const elementToken = sourceCode.getFirstToken(jsxElement)

      const maxLine = jsxElement.attributes.reduce(
        (prev, a) => Math.max(prev, a.name.loc.start.line),
        -1 // no line
      )

      return elementToken.loc.start.line !== maxLine
    }

    function isOnSameLine(attribute, otherAttributes, jsxElement) {
      const line = sourceCode.getFirstToken(attribute).loc.start.line
      const parentLine = sourceCode.getFirstToken(jsxElement).loc.start.line

      if (line === parentLine) return true

      return otherAttributes.some(
        (sibling) =>
          sibling !== attribute &&
          line === sourceCode.getFirstToken(sibling).loc.start.line
      )
    }

    function getAlignmentColumn(jsxElement) {
      const { attributes } = jsxElement
      let alignmentColumn

      // use greatest endpoint of previous tokens as alignment column
      alignmentColumn = attributes
        .filter((attribute) => !isOnSameLine(attribute, attributes, jsxElement))
        .reduce(
          (max, attribute) => Math.max(max, attribute.name.loc.end.column),
          0
        )

      // add 1 for the space
      alignmentColumn += 1

      return alignmentColumn
    }

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {
      JSXAttribute(attribute) {
        const jsxElement = attribute.parent
        const otherAttributes = jsxElement.attributes.filter(
          (a) => a !== attribute
        )
        const canBeIngored = !isMultiLine(jsxElement)

        if (canBeIngored) return

        const nameLine = attribute.name.loc.end.line
        const valueLocStart = attribute.value.loc.start
        const equalTokenStart = getEqualToken(attribute).loc.start
        const alignmentColumn = getAlignmentColumn(jsxElement)
        const isFixable = !isOnSameLine(attribute, otherAttributes, jsxElement)

        const isAligned =
          // isFixable &&
          equalTokenStart.line === nameLine &&
          equalTokenStart.column === alignmentColumn &&
          equalTokenStart.line === valueLocStart.line &&
          valueLocStart.column === alignmentColumn + 2

        if (!isAligned) {
          reportUnaligned(attribute, alignmentColumn, isFixable)
        }
      },
    }
  },
}
