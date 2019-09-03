import Http from '../http'

export default function Tokens(config) {
  const http = Http(config)

  return {
    async status(token) {
      return await http.get(`/tokens/${token}/status`)
    },

    async download(token) {
      return await http.get(`/tokens/${token}/download`)
    },

    async downloadStream(stream, token) {
      return await http.getStream(stream, `/tokens/${token}/download`)
    }
  }
}
