import assert from 'assert'
import Nessus from '../../index'
import { testOptions } from '../../tests/helpers'

const nessus = Nessus(testOptions)

describe("Scans", function() {
  describe("#list", function() {
    it("should return a list of all scans", async function() {
      const data = await nessus.scans.list()
      assert(data)
      assert(data.scans.length > 0)
    })

    it("should return a list of all scans within the specified folder", async function() {
      const data = await nessus.scans.list(3)
      assert(data)
      assert(data.scans.length > 0)
    })
  })

  describe("#details", function() {
    it("should return the details for a scan", async function() {
      const scan = await nessus.scans.details(5)
      assert(scan)
    })
  })
})
