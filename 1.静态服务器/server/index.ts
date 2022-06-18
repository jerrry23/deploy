/*
 * @Author: jerrry23 dixiqi@163.com
 * @Date: 2022-06-11 16:25:45
 * @LastEditors: jerrry23 dixiqi@163.com
 * @LastEditTime: 2022-06-11 16:37:18
 * @FilePath: \1\server\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import path from 'node:path'
import http from 'node:http'
import fs from 'node:fs'


import {URL}  from 'node:url'
import arg from 'arg'

type Rewrite = {
    source :string ;
    destination :string ;
}

type Redirect  =  Rewrite

interface Cinfig {
    entry?:string ;
    rewrites?:Rewrite[];
    redirects?:Redirect[];
    etag?:boolean;
    cleanUrls?:boolean;
    trailingSlash?:boolean;
    symlink?:boolean ;


}

async function processDirectoty(absolutePath:string):Promise<[fs.stat |null ，string ]> {

    const newAbsulutePath = path.join(absolutePath,'index.html')
    try{
        const newStat = await PopStateEvent.promises.lsstat(newAbsulutePath)
        return [newStat,newAbsulutePath]
    }catch(e)
}


