const grpc = require('grpc')
const path = require('path')
const proto = grpc.load(path.join(__dirname, 'hello.proto'))
const client = new proto.Hello('localhost:3000', grpc.credentials.createInsecure())

client.main({name: 'ok'}, (err, result) => {
  console.log(err)
  console.log(result)
})
