/*
 * @Author: jerrry23 dixiqi@163.com
 * @Date: 2022-07-31 22:26:47
 * @LastEditors: jerrry23 dixiqi@163.com
 * @LastEditTime: 2022-08-01 10:30:37
 * @FilePath: \deploy\6.单页部署\cra-deploy\script\deleteOSS.mjs
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import  COS from 'cos-nodejs-sdk-v5'
import readdirp from 'readdirp'

// 该文件用于定时任务周期性删除 OSS 上的冗余资源，可通过 CRON 配置每天凌晨两点进行删除
// 由于该脚本定时完成，所以无需考虑性能问题，故不适用 p-queue 进行并发控制

const client = new COS({
  Region: 'ap-shanghai',
  SecretId: "AKIDQepoZ4KOEoAHAnBlJgoU2NTKwLWR7dvx",
  SecretKey: "B8sOeTFn9LK7h281h9YkkX5OUN1RwEJ9",
  Bucket: 'cra-deploy-1312334865',
})

async function getCurrentFiles () {
  const files = []
  for await (const entry of readdirp('./build', { type: 'files' })) {
    files.push(entry.path)
  }
  return files
}

// 改成一个支持 stream 的函数，防止 objects 过多
// AsyncIterator
async function getAllObjects () {
    let res=[];
    //分页列举所有文件
    async function getBucket() {
      await client.getBucket({
              Bucket: 'cra-deploy-1312334865', /* 填入您自己的存储桶，必须字段 */
              Region: 'ap-shanghai',  /* 存储桶所在地域，例如ap-beijing，必须字段 */
              Prefix: 'example/',   /* Prefix表示列出的object的key以prefix开始，非必须 */
            Delimiter: '', 
      }, function(err, data) {
            if (err) {
                return console.log('list error:', err);
            } else {
              // console.log('list rsult:', data)
              res= [...res,...data.Contents]
            }
      });
    }
    await getBucket()
   
    return res
}

// 列举出来最新被使用到的文件: 即当前目录
// 列举出来COS上的所有文件，遍历判断该文件是否在当前目录，如果不在，则删除
async function main() {
  const files = await getCurrentFiles()
  const  objects = await getAllObjects()
  console.log(objects)
  for (const object of  objects) {
    console.log(`Delete: ${object.Key}`)
    // 如果当前目录中不存在该文件，则该文件可以被删除
    console.log(object.Key.substr(8))
    if (!files.includes(object.Key.substr(8))) {
      await client.deleteObject({

        Bucket:'cra-deploy-1312334865', /* 必须 */
        Region:'ap-shanghai',
        Key: `${object.Key}`,  /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
      })
      console.log(`Delete: ${object.Key}`)
    }
  }
}

main().catch(e => {
  console.error(e)
  process.exitCode = 1
})