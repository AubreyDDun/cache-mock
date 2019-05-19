#!/usr/bin/env node
const path = require('path')
const chalk = require('chalk')
const program = require('commander')
const fs = require('fs')

let packConfig = require('../package.json')
let { addCacheInterceptor, recover } = require('../index')

program
    .version(packConfig.version)
    .option('-c --config [value]', '指定cache-mock-conf.json')
    .option('-r --recover', '复原router文件')
    .parse(process.argv)

if (program.recover) {
    console.log(chalk.blue(`[info] recover router.ts`))
    recover()
} else {
    let configPath = path.join(process.cwd(), program.config || './server/cache-mock-conf.json')
    fs.exists(configPath, (exists) => {
        if (exists) {
            addCacheInterceptor(JSON.parse(fs.readFileSync(configPath)))
            console.log(chalk.blue(`[info] get the file cache-mock-conf.json`))
        } else {
            console.log(chalk.red(`[ERR] ${configPath} does not exist`))
        }
    })
}

