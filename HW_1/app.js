const http = require('http');
const commandLineArgs = require('command-line-args');

const optionDefinitions = [{ name: 'port', alias: 'p', type: Number }];

const options = commandLineArgs(optionDefinitions);

const port = options.port || 3000;

let requestCount = 0;

const server = http.createServer((req, res) => {
  requestCount += 1;
  res.end(
    JSON.stringify({
      message: 'Request handled successfully',
      requestCount,
    }),
  );
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
