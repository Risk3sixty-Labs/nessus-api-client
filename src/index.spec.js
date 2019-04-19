import assert from 'assert'
import Endpoints from './libs/endpoints'
import NessusApiClient from './index'
import { testOptions } from './tests/helpers'

const client = NessusApiClient(testOptions)

describe('NessusApiClient', function() {
  describe('endpoints', function() {
    it(`should load all endpoint namespaces and methods`, async function() {
      Object.keys(Endpoints).forEach(namespace => {
        Object.keys(Endpoints[namespace]).forEach(method => {
          assert.equal('function', typeof client[namespace][method])
        })
      })
    })
  })
})
