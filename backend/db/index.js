const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/Movies').then(()=>{
    console.log('db is connected');
}).catch((ex)=>{
    console.log('erreur de connexion', ex);
})