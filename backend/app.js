const express = require("express");
require("express-async-errors");
require("dotenv").config();
require("./db");

const userRouter = require("./routes/user");
const actorRouter = require("./routes/actor");
const morgan = require("morgan");
const { errorHandler } = require("./middlewares/error");
const cors = require("cors");
const { handleNotFound } = require("./utils/helper");
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/user", userRouter);
app.use("/api/actor", actorRouter);

app.use("/*", handleNotFound);

app.use(errorHandler);

// app.post('/about',(req, res,next) =>{
//     const { email , password} = req.body;
//     if( !password || !email)
//         return res.json({error : " email or password emty ! "});
//     next();
// },
//     (req,res) =>{
//     res.send('<h1>Hello about</h1>');
//     }
// )

app.listen(8000, () => {
  console.log("the port is 8000");
});
