
const express = require('express');
const app = express();
app.use(express.json());

app.use(express.static('./client/build'));

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(404).send({ message: 'unknown endpoint' })
  } 

  next(error)
}

app.use(errorHandler)
app.use('/api/', require('./api'));


module.exports = app