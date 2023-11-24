import fetcher from '../fetcher'
import { dq1, formDataToBlob } from '../utils'
import env from './env'

const apiURL = `https://localhost:${env.port}`

const upload = dq1<HTMLInputElement>('#upload')

dq1('#send-form').addEventListener('click', () => {
  const file = upload.files[0]
  const form = new FormData()

  file && form.append('file', file)
  form.append('data', '1111')
  form.append('data2', '222')

  fetch(apiURL + '/upload', {
    method: 'POST',
    body: form,
  })
    .then((res) => res.text())
    .then((res) => {
      console.log(res)
    })
})

dq1('#send-blob').addEventListener('click', async () => {
  const file = upload.files[0]
  const form = new FormData()

  file && form.append('file', file)
  form.append('data', '1111')
  form.append('data2', '222')

  const formBlob = formDataToBlob(form)
  const arr = new Uint8Array(await formBlob.arrayBuffer())

  fetch(apiURL + '/upload', {
    method: 'POST',
    body: arr,
    headers: {
      'Content-Type': `multipart/form-data; boundary=${env.formDataBoundary}`,
    },
  })
    .then((res) => res.text())
    .then((res) => {
      console.log(res)
    })
})

dq1('#send-fetcher').addEventListener('click', () => {
  const file = upload.files[0]
  const form = new FormData()

  file && form.append('file', file)
  form.append('data', '1111')
  form.append('data2', '222')

  fetcher(apiURL + '/upload', {
    method: 'POST',
    body: form,
    onProgress(percent, progress, total) {
      console.log(percent, progress, total)
    },
  })
    .then((res) => res.text())
    .then((res) => {
      console.log(res)
    })
})

dq1('#get-img').addEventListener('click', () => {
  fetcher(apiURL + '/file/test.png', {
    onProgress(percent, progress, total) {
      console.log(percent, progress, total)
    },
  })
})
