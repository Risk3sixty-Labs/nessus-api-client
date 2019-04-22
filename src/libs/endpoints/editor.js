import Http from '../http'

export default function Editor(config) {
  const http = Http(config)

  return {
    async list(type='scan') {
      return await http.get(`/editor/${type}/templates`)
    },

    async details(templateUuid, type='scan') {
      return await http.get(`/editor/${type}/templates/${templateUuid}`)
    },

    async detailsByName(templateName='advanced', type='scan') {
      const uuid = await this.templateUuidByName(templateName, type)
      return await http.get(`/editor/${type}/templates/${uuid}`)
    },

    async templateUuidByName(templateName='advanced', type='scan') {
      const info = await this.list(type)
      const template = info.templates.find(temp => temp.name.toLowerCase() === templateName.toLowerCase())
      return template.uuid
    }
  }
}
