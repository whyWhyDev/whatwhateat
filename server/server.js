const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000;

const apiRouter = require('./routes/api');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../client')));

// app.get('/poopcoins', apiRouter);
app.use('/', apiRouter);

app.use('*', (req, res) => {
  return res.status(404).json('404 NOT FOUND!');
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };

  // const errObj = Object.assign(defaultErr, err);
  const errObj = { ...defaultErr, ...err }; // same^

  return res.status(errObj.status).json(errObj.message);
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}...`));

module.exports = app;
