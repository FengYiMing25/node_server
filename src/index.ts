import * as http from "http";
const server = http.createServer();

server.on("request", (request, response) => {
  console.log("有人访问我的接口了");
  response.end("hi");
});
server.listen(8888);
