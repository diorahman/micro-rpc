const serve = require('./')
const test = require('ava')
const grpc = require('grpc')
const path = require('path')
const sleep = require('then-sleep')

function poke () {
  return new Promise((resolve, reject) => {
    const proto = grpc.load(path.join(__dirname, 'hello.proto'))
    const client = new proto.Hello('localhost:3000', grpc.credentials.createInsecure())
    client.main({name: 'ok'}, (err, result) => {
      if (err) {
        return reject(err)
      }
      resolve(err)
    })
  })
}

test('ok', async (t) => {
  const server = serve('hello', async (call) => {
    return {message: call.name}
  })
  await sleep(1000)
  t.deepEqual(true, true)
  const result = await poke()
  console.log(result)
  server.stop()
})
