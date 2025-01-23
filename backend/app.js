const express = require('express');
const userRouter = require('./routes/user')
const app = express();

app.use('/api/user',userRouter);

app.get('/about',(req, res) =>{
    res.send('<h1>Hello about</h1>')
})

app.listen(8000, () =>{
    console.log("the port is 8000");
})
