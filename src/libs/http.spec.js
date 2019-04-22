import assert from "assert"
import Http from './http'
import { testOptions } from '../tests/helpers'

describe("HTTP", function() {
  describe("initialize", function() {
    it("should load all the verbs/methods", function() {
      assert.deepEqual(
        Object.keys(Http(testOptions)).sort(),
        [
          'config',
          'configure',
          'get',
          'getRequestOptions',
          'put',
          'post',
          'del',
          'doRequest',
          'streamRequest'
        ].sort()
      )
    })
  })
})
