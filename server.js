const express = require('express');
const log4js = require('log4js');
log4js.configure('./log4js.json');
const log = log4js.getLogger("app");

const app = express();

// Access Log Middleware
app.use(log4js.connectLogger(log4js.getLogger("http"), { level: 'auto' }));

app.get('/', (req, res, next) => {
  log.debug("Hit / ");
  res.send('Success');
});

app.get('/error', (req, res, next) => {
  throw new Error('ERROROROORORORROOROR');
});


/// error handlers
app.use(function(err, req, res, next) {
  log.error("Something went wrong:", err);
  res.sendStatus(err.status || 500);
});


app.listen(3000, () => {
  log.info("server running on port 3000");
})