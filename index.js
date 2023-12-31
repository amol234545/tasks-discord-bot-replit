const fastify = require("fastify")()

function streamByLines(stream) {
  stream.setEncoding('utf8');
  return {
    async *[Symbol.asyncIterator]() {
      let buffer = '';

      for await (const chunk of stream) {
        buffer += chunk;
        const lines = buffer.split(/\r?\n/);
        buffer = lines.pop();
        for (const line of lines) {
          yield line;
        }
      }
      if (buffer.length > 0) yield buffer;
    },
  };
}
async function line() {
   for await (const line of streamByLines(process.stdin)) 
  {
  return JSON.parse(line)
  }
}
fastify.get("/",(req,res) => {res.send("lollo")})
fastify.post("/refresh", async (req,res) => {
  if (req.body) {
    console.log("repl.deploy" + req.body + req.headers["Signature"])
    const result = await line();
    res.status(result.status);
    console.log("repl.deploy-success");
    res.send(result.body);
  }
})
fastify.addHook('onResponse', (request, reply, done) => {
  if (request.routeOptions.url == "/refresh") {
    console.log("repl.deploy-success");
  }
  done()
})

fastify.listen({host:"0.0.0.0",port:3000})
