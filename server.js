const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./routes/user.js');
const dataRouter = require('./routes/data.js');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser : true, useCreateIndex: true});
const connection = mongoose.connection;
connection.once('open', ()=> {
    console.log('MongoDB database connection established successfully')
})


app.use(cors());

app.use(express.json());

app.use(userRouter);
app.use(dataRouter);

//developpement 
// app.listen(5000, ()=> {
//     console.log('localhost')
// });


 // production
const server = app.listen(port, ()=> {
    const port = server.address().port;
    console.log('server is running on port :', port);
})
