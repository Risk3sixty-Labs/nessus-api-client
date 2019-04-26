import fs from 'fs'
import util from 'util'
import Http from './libs/http'
import Endpoints from './libs/endpoints'

// `options` can be any requestjs supported options:
// https://www.npmjs.com/package/request#requestoptions-callback
export default function NessusApiClient({
  url,
  accessKey,
  accessSecret,
  ...options
}) {
  const userConfig = { url, accessKey, accessSecret, ...options }

  return {
    http: Http(userConfig),

    config(newOptions) {
      return this.http.config = { ...this.http.config, ...newOptions }
    },

    ...Object.keys(Endpoints).reduce((obj, namespace) => ({ ...obj, [namespace]: Endpoints[namespace](userConfig) }), {})
  }
}
