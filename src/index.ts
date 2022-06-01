import * as fs from "fs";
import * as p from "path";
import * as http from "http";
import * as url from "url";
const server = http.createServer();
const publicPath = p.resolve(
  __dirname.slice(0, __dirname.length - 4),
  "public"
);
server.on("request", (request, response) => {
  const { url: path } = request;
  const { pathname, query } = url.parse(path);
  let fileName = pathname.substr(1);
  if (fileName === "") {
    fileName = "index.html";
  }
  if (fileName === "favicon.ico") return;
  fs.readFile(p.resolve(publicPath, fileName), (error, data) => {
    if (error) {
      console.log(error);
      if (error.errno === -4058) {
        response.statusCode = 404;
        fs.readFile(p.resolve(publicPath,'404.html'),(error,data)=>{
          response.end(data)
        })
        response.setHeader("Content-Type", "text/html;charset=utf-8");
        // response.end("你访问的文件不存在");
      } else if (error.errno === -4068) {
        response.statusCode = 403;
        response.setHeader("Content-Type", "text/html;charset=utf-8");
        response.end("你无权访问次目录");
      } else {
        response.statusCode = 500;
        response.setHeader("Content-Type", "text/html;charset=utf-8");
        response.end("服务器繁忙，请稍后重试");
      }
    } else {
      response.end(data);
    }
  });
});

// 启动监听端口号
server.listen(8888);
