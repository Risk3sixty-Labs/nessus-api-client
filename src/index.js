import fs from 'fs'
import util from 'util'
import Http from './libs/http'
import Endpoints from './libs/endpoints'

export default function NessusApiClient({
  url,
  accessKey,
  accessSecret
}) {
  const userConfig = { url, accessKey, accessSecret }

  return {
    http: Http(userConfig),

    config(newOptions) {
      return this.http.config = { ...this.http.config, ...newOptions }
    },

    ...Object.keys(Endpoints).reduce((obj, namespace) => ({ ...obj, [namespace]: Endpoints[namespace](userConfig) }), {})
  }
}
