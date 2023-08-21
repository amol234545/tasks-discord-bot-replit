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
  return line
  }
}

fastify.post("/refresh", (req,res) => {
  if (req.body) {
    console.log("repl.deploy" + req.data + req.headers["Signature"])
    const result = JSON.parse(await line())
    res.status(result.status)
    res.send(result.body)
    console.log("repl.deploy-success")
  }
})