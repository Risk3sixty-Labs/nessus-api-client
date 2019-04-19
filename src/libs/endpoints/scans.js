import Http from '../http'

export default function Scans(config) {
  const http = Http(config)

  return {
    async list(fid) {
      let attrs = []
      if (fid)
        attrs.push(`folder_id=${fid}`)

      return await http.get("/scans", attrs)
    },

    async create(obj) {
      return await http.post("/scans", [], obj)
    },

    async details(sid) {
      return await http.get(`/scans/${sid}`, [])
    },

    async pluginOutput(sid, hid, pid) {
      return await http.get([ "/scans", sid, "hosts", hid, "plugins", pid ].join("/"), [])
    },

    async move(sid, fName) {
      const data = await http.get("/folders", [])
      const folder_id = data.folders.filter(f => f.name === fName )[0].id
      return await http.put(`/scans/${sid}/folder`, [], { folder_id })
    },

    async configure(sid, obj) {
      return await http.put(`/scans/${sid}`, [], obj)
    }
  }
}
