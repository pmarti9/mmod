import * as dotenv from 'dotenv'
dotenv.config();
import log4js from 'log4js'
const logger = log4js.getLogger()
import express from 'express'
import mongoose from 'mongoose'
import path from 'path'
// import config from 'config'

const app = express();

app.use(express.json());

//database configuration
const db = process.env.MONGO_URI

//connect to mongo
mongoose
    .connect(db, {
        useNewUrlParser: true,
        // useCreateIndex: true,
    })
    .then(() => logger.info("MongoDB Connected..."))
    .catch((err) => logger.info(err));

//routes  -- figure out how to do it with ES6
// app.use();


// serve static assets if in production
if (process.env.NODE_ENV === "production") {
    // set static folder
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
