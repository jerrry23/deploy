/*
 * @Author: jerrry23 dixiqi@163.com
 * @Date: 2022-05-29 10:44:21
 * @LastEditors: jerrry23 dixiqi@163.com
 * @LastEditTime: 2022-06-11 16:25:45
 * @FilePath: \1\server.js
 * @Description: 与上个版本相比 ，这里主要是增加header 
 */
const  http = require('node:http')
const  fs = require('node:fs')

const fsp =  require('node:fs/promises')
const html= fs.readFileSync("./index.html")


const server  = http.createServer(async (req,res) =>{   

  // const stat = await  fsp.stat("./index.html")
  // res.setHeader("content-length",stat.size)
   // 此处需要手动处理下 Content-Length
  fs.createReadStream('./index.html').pipe(res)
})

server.listen(3000,()=>{
    console.log("listening 3000")
})

// node 如何读取一个2G的文件 

// 当不设置响应头的时候 ，http 响应的报文会有Transfer-Encoding: chunked 

 
