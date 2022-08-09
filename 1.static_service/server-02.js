/*
 * @Author: jerrry23 dixiqi@163.com
 * @Date: 2022-05-29 10:44:21
 * @LastEditors: jerrry23 dixiqi@163.com
 * @LastEditTime: 2022-06-11 17:54:32
 * @FilePath: \1\server.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const  http = require('node:http')
const  fs = require('node:fs')
const html= fs.readFileSync("./index.html")


const server  = http.createServer((req,res) =>{   
  
   // 此处需要手动处理下 Content-Length
  fs.createReadStream('./index.html').pipe(res)

  //采用stream 处理更为妥当 
    //res.end(html)
    // 此时 Transfer-Encoding: chunked
    // content-length 丢失需要添加 
})

server.listen(3000,()=>{
    console.log("listening 3000")
})

// node 如何读取一个2G的文件 
