import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

console.log('dbconfig...');

const sequelize = new Sequelize(
    process.env.DATABASE_STRING,
    process.env.DB_USERNAME,
    process.env.PASSWORD,
    {
        host: "localhost",
        dialect: "postgres",
    },
);

// initialize db connection
function init() {
    
    sequelize
        .sync(  )
        .then(() => {
            console.log("Connection has been established successfully.");
        })
        .catch((error) => {
            console.error("Unable to connect to the database:", error);
        });
}

async function connect() {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}

export {
    sequelize, init, connect
}
