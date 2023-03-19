const files = import.meta.globEager('./modules/*.ts')
const api: Record<string, { [key: string]: string }> = {}
Object.keys(files).forEach((key: string) => {
  if (files[key].default !== undefined && files[key].default instanceof Object) api[key.split('/')[2].split('.')[0]] = files[key].default
})
export default api
