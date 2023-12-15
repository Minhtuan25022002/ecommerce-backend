const express = require('express');
const dotenv  = require('dotenv');
const { default: mongoose } = require('mongoose');
dotenv.config()

const app = express();
const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
    res.send('Hello')
})

mongoose.connect(`mongodb+srv://minhtuan:${process.env.MONGO_DB}@cluster0.j28zdbn.mongodb.net/?retryWrites=true&w=majority`) 
        .then(() => {
            console.log('Connected to Mongoose');
        }) 
        .catch(err => {
            console.log(err);
        })

app.listen(port, () => {   
    console.log(`http://localhost:${port}/`);
}); 