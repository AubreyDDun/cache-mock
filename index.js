const chalk = require('chalk');
const fs = require("fs");
const path = require("path");

const routerPath = path.join(process.cwd(), './server/app/router.ts')
const tempRouterPath = path.join(process.cwd(), './server/app/temp-router.ts')

const routerExists = async () => {
    fs.exists(routerPath, (exists) => {
        if (exists) {
            console.log(chalk.blue(`[info] get the file router.ts`))
            return true
        }
        console.log(chalk.red(`[ERR] ${configPath} does not exist`))
    })
}

const newRouterWithInterceptor = async () => {
    fs.exists(tempRouterPath, (exists) => {
        if (exists) {
            console.log(chalk.blue(`[info] no need to make temp-router.ts`))
        } else {
            console.log(chalk.blue(`[info] now, let's make new routers with cache-mock interceptor`))
            let readStream = fs.createReadStream(routerPath)
            let writeStream = fs.createWriteStream(tempRouterPath)
            readStream.pipe(writeStream)
            console.log(chalk.blue(`[info] you got a temp-router.ts`))
        }
    })
}

const addCacheInterceptor = async (config) => {
    if (routerExists()) {
        await newRouterWithInterceptor(config)
    }

}

const recover = () => {
    fs.exists(tempRouterPath, (exists) => {
        if (exists) {
            fs.rename(tempRouterPath, routerPath, (err) => {
                if (err) throw err;
                console.log(chalk.blue(`[info] router.ts recovered!`))
            });
        } else {
            console.log(chalk.red(`[ERR] ${configPath} does not exist`))
        }
    })
}


module.exports = {
    addCacheInterceptor,
    recover
}

