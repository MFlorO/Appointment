require('dotenv').config();

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT, DATABASE_URL, JWT_SECRET } = process.env;

module.exports = {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_NAME,
    DB_PORT,
    DATABASE_URL,
    JWT_SECRET
};