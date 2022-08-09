/*
 * @Author: jerrry23 dixiqi@163.com
 * @Date: 2022-05-29 10:35:31
 * @LastEditors: jerrry23 dixiqi@163.com
 * @LastEditTime: 2022-05-29 10:42:13
 * @FilePath: \1\server.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const  http = require('node:http')

const  html =`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    hello world
</body>
</html>`

const server  = http.createServer((req,res) =>{
    res.end(html)
})

server.listen(3000,()=>{
    console.log("listening 3000")
})