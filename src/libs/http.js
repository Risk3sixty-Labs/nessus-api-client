import path from 'path'
import request from 'request'
import requestPromise from 'request-promise-native'

// const packageVersion = require(path.join('..', '..', 'package.json')).version
const packageVersion = '0.0.1'

export default function Http(config) {
  return {
    config: { ...config },

    configure() {
      let opts = {
        ...this.config,
        headers: {
          "User-Agent": `r3s-nessus-api-client-${packageVersion}`,
          "X-ApiKeys": `accessKey=${this.config.accessKey}; secretKey=${this.config.accessSecret}`
        }
      }

      delete opts.accessKey
      delete opts.accessSecret
      return opts
    },

    async get(path, params) {
      return await this.doRequest('GET', path, params)
    },

    getStream(path, params) {
      return this.streamRequest('GET', path, params)
    },

    async post(path, params, data) {
      return await this.doRequest('POST', path, params, data)
    },

    async put(path, params, data) {
      return await this.doRequest('PUT', path, params, data)
    },

    async del(path, params) {
      return await this.doRequest('DELETE', path, params)
    },

    async doRequest(verb, path, params, data=true) {
      const opts = this.getRequestOptions(verb, path, params, data)
      const response = await requestPromise({ ...opts, resolveWithFullResponse: true })

      if (response.error)
        throw new Error(response.error)

      return response.body
    },

    streamRequest(verb, path, params, data=true) {
      const opts = this.getRequestOptions(verb, path, params, data)
      return request(opts)
    },

    getRequestOptions(verb, path, params, data=true) {
      let opts = this.configure()

      opts.method = verb
      opts.url    = config.url + path
      opts.json   = data || true

      if (params && params.length > 0)
        opts.url += `?${params.join("&")}`

      return opts
    }
  }
}
