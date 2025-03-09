import dotenv from "dotenv";
dotenv.config();
import pkg from "pg";
const {Pool} = pkg;

const pool = new Pool({
  user: process.env.DATABASE_USER ,
  host: process.env.DATABASE_HOST ,
  database: process.env.DATABASE_NAME ,
  password: process.env.DATABASE_PASSWORD ,
  port: process.env.DATABASE_PORT,
});

pool
  .connect()
  .then(() => console.log("Connected to Database!"))
  .catch((err) => console.log(`Falied to connect to database - ${err}`));

export default pool;
