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
        if (status === 200 || status === 201) statusColor = chalk.green
        else if (status === 404) statusColor = chalk.red


        console.log(`Method: ${methodColor(method)} | Time: [${chalk.yellow(time)}] | Status: ${statusColor(status)}`)
    })

    next()
}

export default logger