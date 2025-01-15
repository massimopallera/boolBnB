import mysql from 'mysql2'
import dotenv from 'dotenv'
import chalk from 'chalk'

const pool = mysql.createPool({
    host: dotenv.config().parsed.DB_HOST,
    port: dotenv.config().parsed.DB_PORT,
    user: dotenv.config().parsed.DB_USER,
    password: dotenv.config().parsed.DB_PASSWORD,
    database: dotenv.config().parsed.DB_DATABASE
});

pool.query( 'SELECT 1', (err, results) => {
    if (err) throw err;
    // console.log('Connected to MySQL');
    // console.log('Connected to Database');
	console.log(`+------------------------------------------------------------+
| ${chalk.blueBright('Database pool Information')}                            |
+------------------------------------------------------------+
| ${chalk.blue('Host')}: ${dotenv.config().parsed.DB_HOST}                      			     |
| ${chalk.blue('Port')}: ${dotenv.config().parsed.DB_PORT}                      			     |
| ${chalk.blue('User')}: ${dotenv.config().parsed.DB_USER}						     |
| ${chalk.blue('Database')}: ${dotenv.config().parsed.DB_DATABASE}			             |
+------------------------------------------------------------+
| ${chalk.blue('pool Status')}: ${(!err) ? (chalk.green('Connected')+"\t\t\t\t    ") : (chalk.red('Not Connected')+"\t\t\t    ")} |
+------------------------------------------------------------+
`)
});

export default pool;