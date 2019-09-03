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

    downloadStream(token) {
      return http.getStream(`/tokens/${token}/download`)
    }
  }
}
