import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { componentDetails, getSvelteFiles, isModuleMain } from './common.js'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const checkForEvents = async (sveltePath) => {
  const pathToType = path.join(
    dirname,
    '../../',
    'types',
    path.relative('./', sveltePath + '.d.ts')
  )
  const fileContents = await fs.readFile(pathToType)

  const typeRegex = /\s+([a-zA-Z0-9]+): (CustomEvent<((.|\n)*?)>)/gm

  const componentEventNames = [
    ...fileContents.toString().matchAll(typeRegex)
  ].map((match) => ({
    eventName: match[1],
    detailType: match[2]
  }))

  if (componentEventNames.length) {
    const { componentName } = componentDetails(sveltePath)
    throw new Error(`The following event types are forwarded from ${componentName}
${componentEventNames.map((c) => `- ${c.eventName}`).join('\n')}
Using on: prefixed events is deprecated and should be avoided. Instead, add a callback as a prop, as you would in React.`)
  }
}

export const checkForInternalEvents = async (sveltePath) => {
  const fileContents = await fs.readFile(sveltePath, 'utf8')

  const openTags = /<[A-Z]\w+ (.|\n)*?>/gm
  for (const match of fileContents.matchAll(openTags)) {
    if (match[0].includes(' on:')) {
      // Line number is the number of newlines before the match.
      const lineNumber = fileContents
        .substring(0, match.index)
        .split('\n').length
      throw new Error(
        `Looks like you're accidentally using an on: event on a Leo component. Did you mean "${match[0].replaceAll(
          / on:([a-z])/g,
          (m, g) => ` on${g.toUpperCase()}`
        )}" (${sveltePath}:${lineNumber})`
      )
    }
  }
}

export const auditComponents = async (rootDir) => {
  for await (const sveltePath of getSvelteFiles(rootDir, false, true)) {
    if (!sveltePath.endsWith('.stories.svelte'))
      await checkForEvents(sveltePath)
    await checkForInternalEvents(sveltePath)
  }
}

// Check if this module is being run directly
if (isModuleMain(import.meta.url)) {
  auditComponents('./src/components')
}
