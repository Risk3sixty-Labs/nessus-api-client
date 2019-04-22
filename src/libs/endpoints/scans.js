import Http from '../http'

export default function Scans(config) {
  const http = Http(config)

  return {
    async list(folderId) {
      let attrs = []
      if (folderId)
        attrs.push(`folder_id=${folderId}`)

      return await http.get("/scans", attrs)
    },

    async create(obj) {
      return await http.post("/scans", [], obj)
    },

    async details(scanId) {
      return await http.get(`/scans/${scanId}`, [])
    },

    async exportRequest(scanId, options={}) {
      return await http.post(`/scans/${scanId}/export`, [], { format: 'nessus', ...options })
    },

    async pluginOutput(scanId, hid, pid) {
      return await http.get([ "/scans", scanId, "hosts", hid, "plugins", pid ].join("/"), [])
    },

    async move(scanId, fName) {
      const data = await http.get("/folders", [])
      const folder_id = data.folders.filter(f => f.name === fName )[0].id
      return await http.put(`/scans/${scanId}/folder`, [], { folder_id })
    },

    async configure(scanId, obj) {
      return await http.put(`/scans/${scanId}`, [], obj)
    }
  }
}
