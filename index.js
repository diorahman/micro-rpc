const grpc = require('grpc')
const path = require('path')

module.exports = serve

function toClassCase (str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter, index) {
    return letter.toUpperCase()
  }).replace(/\s+/g, '')
}

// expect no package name from proto
function serve (name, fn, options = {}) {
  const className = toClassCase(name)
  const proto = grpc.load(path.join(__dirname, `${name}.proto`))
  const server = new grpc.Server()
  server.addProtoService(proto[className].service, {main: (call, callback) => {
    fn(call)
      .then((result) => {
        callback(null, result)
      })
      .catch((err) => {
        callback(err)
      })
  }})
  server.bind(`0.0.0.0:${options.port || 3000}`, grpc.ServerCredentials.createInsecure())
  server.start()
  return server
}
