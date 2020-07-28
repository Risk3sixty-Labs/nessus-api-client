import assert from 'assert'
import Nessus from '../../index'
import { testOptions } from '../../tests/helpers'

const nessus = Nessus(testOptions)

describe('Scans', function () {
  describe('#list', function () {
    it('should return a list of all scans', async function () {
      const data = await nessus.scans.list()
      assert(data)
      assert(data.scans.length > 0)
    })

    it('should return a list of all scans within the specified folder', async function () {
      const data = await nessus.scans.list(3)
      assert(data)
      assert(data.scans.length > 0)
    })
  })

  describe('#exportRequest and tokens#status', function () {
    it('should return a valid token for exporting a scan', async function () {
      const data = await nessus.scans.list()
      assert(data)

      const { token } = await nessus.scans.exportRequest(data.scans[0].id)
      assert.equal('string', typeof token)
      assert.equal(true, token.length > 0)

      const { status } = await nessus.tokens.status(token)
      assert.equal('string', typeof status)
      assert.equal(true, status.length > 0)
    })
  })

  describe('#details', function () {
    it('should return the details for a scan', async function () {
      const scan = await nessus.scans.details(5)
      assert(scan)
    })
  })
})
