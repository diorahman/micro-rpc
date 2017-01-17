const app = require('./')
const sleep = require('then-sleep')

app('hello', async ({request}) => {
  await sleep(2000)
  console.log(request)
  return {message: 'ok'}
})
