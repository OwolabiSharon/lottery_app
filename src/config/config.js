require('dotenv').config();

module.exports = {
  env: process.env.NODE_ENV,
  development: {
    username: process.env.dbUser || 'root',
    password: process.env.dbPassword || null,
    database: process.env.dbName || 'development',
    host: process.env.dbHost || '127.0.0.1',
    dialect: 'postgres',
    operatorsAliases: 0,
  },
  test: {
    username: process.env.dbUser || 'root',
    password: process.env.dbPassword || null,
    database: process.env.dbName || 'development',
    host: process.env.dbHost || '127.0.0.1',
    dialect: 'postgres',
    operatorsAliases: 0,
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'postgres',
    operatorsAliases: 0,
  },
  email: {
    smtp: {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    },
    from: process.env.EMAIL_FROM,
  },
};
