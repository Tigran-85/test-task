const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require('path');
const fs = require('fs');

// env
require("dotenv").config();
const port = process.env.PORT || 3000;

// routes
// const postRoutes = require("./routes/postRoutes");
const authRoutes = require("./routes/authRoutes");
// const accountRoutes = require("./routes/accountRoutes");
// const { mysql } = "./config/database.js";

// database
// mongoose
//   .connect(process.env.DB_URL)
//   .then(() => console.log("Successfully connected database"))
//   .catch((err) => {
//     throw err;
//   });

const { createConnection } = require('mysql');

const mysql = createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "sJEL6zyFdMn!7GV&9HaX",
    database: "test",
    connectionLimit: 10
})

mysql.connect((err, res) => {
    if (err) {
        return console.error(err.message, 'cannot connect to database...');
    }
    return console.log("Database connected successfully  ");
});

const users = fs.readFileSync(path.join(__dirname, './test.sql')).toString();
     mysql.query(users,  (err, result) => {
        if (err){
             throw err;
        }else{
            console.log("Query run successfully", users);
        }
});
// ----------------------------------------

// MIDDLEWARE
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static("public"));


app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:8081"],
  })
);
// use routes

app.use("/api/auth", authRoutes);
// app.use("/api/posts", postRoutes);
// app.use("/api/account", accountRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname + '/dist/'));

  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/dist/index.html'));
}

// listen port
app.listen(port, () => console.log(`Server started on port ${port}`));
