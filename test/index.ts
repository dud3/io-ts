import * as assert from 'assert'
import * as glob from 'glob'
import * as path from 'path'
import * as _ from '../src'

const getExportName = (name: string): string => {
  return name.substring(0, 1).toLowerCase() + name.substring(1)
}

function getModuleNames(): ReadonlyArray<string> {
  return glob.sync('./src/**/*.ts').map((file) => path.parse(file).name)
}

describe('index', () => {
  it('check exported modules', () => {
    const moduleNames = getModuleNames()
    moduleNames.forEach((name) => {
      if (name !== 'index') {
        const exportName = getExportName(name)
        assert.deepStrictEqual(
          (_ as Record<string, unknown>)[exportName] !== undefined,
          true,
          `The "${name}" module is not exported in src/index.ts as ${exportName}`
        )
      }
    })
  })
})
