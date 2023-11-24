import env from './test/env'

export function formDataToBlob(formData: FormData) {
  var boundary = env.formDataBoundary
  var chunks = []

  formData.forEach(function (value, key) {
    var chunk = ''
    chunk += '--' + boundary + '\r\n'
    if (value instanceof File) {
      chunk +=
        'Content-Disposition: form-data; name="' +
        key +
        '"; filename="' +
        value.name +
        '"\r\n'
      chunk += 'Content-Type: ' + value.type + '\r\n\r\n'
      chunks.push(chunk)
      chunks.push(value)
      chunks.push('\r\n')
    } else {
      chunk += 'Content-Disposition: form-data; name="' + key + '"\r\n\r\n'
      chunk += value + '\r\n'
      chunks.push(chunk)
    }
  })

  chunks.push('--' + boundary + '--')

  var blob = new Blob(chunks, {
    type: 'multipart/form-data; boundary=' + boundary,
  })

  return blob
}

export type ValueOf<T> = T[keyof T]

export const dq: {
  <K extends keyof HTMLElementTagNameMap>(
    selectors: K,
    tar?: Document | ValueOf<HTMLElementTagNameMap> | Element
  ): HTMLElementTagNameMap[K][]
  <K extends keyof SVGElementTagNameMap>(
    selectors: K,
    tar?: Document | ValueOf<SVGElementTagNameMap> | Element
  ): SVGElementTagNameMap[K][]
  <K extends keyof MathMLElementTagNameMap>(
    selectors: K,
    tar?: Document | ValueOf<MathMLElementTagNameMap> | Element
  ): MathMLElementTagNameMap[K][]
  <E extends Element = HTMLDivElement>(
    selectors: string,
    tar?: Document | Element
  ): E[]
} = (selector: string, tar = window.document) => {
  return Array.from(tar.querySelectorAll(selector))
}
export let dq1: {
  <K extends keyof HTMLElementTagNameMap>(
    selectors: K,
    tar?: Document | ValueOf<HTMLElementTagNameMap> | Element
  ): HTMLElementTagNameMap[K] | null
  <K extends keyof SVGElementTagNameMap>(
    selectors: K,
    tar?: Document | ValueOf<SVGElementTagNameMap> | Element
  ): SVGElementTagNameMap[K] | null
  <E extends Element = HTMLDivElement>(
    selectors: string,
    tar?: Document | Element
  ): E | null
} = (selector: string, tar = window.document) => {
  let dom = tar.querySelector(selector)
  return dom
}
