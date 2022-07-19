const config = require('config.json');
// const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');
const { host, port, user, password, database } = config.database;
const Pool = require('pg').Pool

// initialize();

// async function initialize() {
//     // create db if it doesn't already exist
//     const { host, port, user, password, database } = config.database;
//     const connection = new Pool({
//         user: user,
//         host: host,
//         database: database,
//         password: password,
//         port: port,
//       })
//     // const connection = await mysql.createConnection({ host, port, user, password });
//     // await connection.query(`SELECT 'CREATE DATABASE mydb'
//     // WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '${database}');`);

//     // connect to db
//     const sequelize = new Sequelize(database, user, password, { host : host, dialect: 'postgres' });

//     // sync all models with database
//     await sequelize.sync();
// }

const db = new Sequelize(database, user, password, { host : host, dialect: 'postgres' });


module.exports = db