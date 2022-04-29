require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { connect } = require('./database');
const usersRouter = require('./routes/users');
const authsRouter = require('./routes/auth');
const favsListsRouter = require('./routes/favsLists');
const { auth } = require('./utils/auth');

const port = process.env.PORT || 8000;
const app = express();
connect();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.get('/', auth,(req, res) => {
    res.status(200).json({message: "it´s working"});
})

app.use('/api/users', usersRouter);
app.use('/api/favs', favsListsRouter);
app.use('/auth/local', authsRouter);

app.listen(port, ()=>{
    console.log('App running at http://localhost:8000');
})