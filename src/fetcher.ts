import env from './test/env'
import { formDataToBlob } from './utils'

const fetcher: typeof fetch = async (input, init) => {
  const { onProgress, method = 'get' } = init

  const m = method.toLowerCase()
  if (onProgress && m == 'post' && init?.body instanceof FormData) {
    const formBlob = formDataToBlob(init.body)
    const arr = new Uint8Array(await formBlob.arrayBuffer())

    const length = arr.length
    // 还有时间限制的，分块太大后面就断开了
    const blockSize = length / 1
    let received = 0

    const stream = new ReadableStream<Uint8Array>({
      pull(controller) {
        console.log('pull', received, received + blockSize)
        controller.enqueue(arr.copyWithin(received, received + blockSize))
        received += blockSize
        if (received >= arr.length) {
          console.log('close')
          controller.close()
        }
        onProgress(received / length, received, length)
      },
    })
    init.body = stream
    init.headers = {
      ...(init?.headers ?? {}),
      'Content-Type': `multipart/form-data; boundary=${env.formDataBoundary}`,
    }
    init.duplex = 'half'
  }

  const response = await fetch(input, init)
  // method get
  if (onProgress && m === 'get') {
    let loading = true
    const chunks: Uint8Array[] = []
    const reader = response.body?.getReader()
    const length = +response.headers.get('content-length')
    let received = 0
    while (loading) {
      const { done, value } = await reader.read()
      if (done) {
        loading = false
      } else {
        chunks.push(value)
        received += value.length
      }
      onProgress(received / length, received, length)
    }
  }
  return response
}

export default fetcher
