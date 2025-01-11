import chalk from "chalk";

const logger = (req, res, next) => {

    const time = new Date().toString()

    const method = req.method
    let methodColor;

    if (method === "GET") methodColor = chalk.green
    if (method === "POST") methodColor = chalk.bgYellow.black
    if (method === "PUT") methodColor = chalk.yellow
    if (method === "DELETE") methodColor = chalk.red

    // const path = req.baseUrl !== '' ? '/' : req.baseUrl //doesn't find path

    res.on('finish', () => {
        const status = res.statusCode
        let statusColor = chalk.white;
        if (status >= 200 && status < 300) statusColor = chalk.green // 👌 Success
        else if (status >= 300 && status < 400) statusColor = chalk.blue
        else if (status >= 400 && status < 500) statusColor = chalk.red // ❓❗ Bad requests
        else if (status >= 500) statusColor = chalk.redBright // 💀 Server Error

        console.log(`Method: ${methodColor(method)} | Time: [${chalk.yellow(time)}] | Status: ${statusColor(status)}`)
    })

    next()
}

export default logger