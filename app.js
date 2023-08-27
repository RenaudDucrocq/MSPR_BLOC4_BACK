let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let bodyParser = require("body-parser");
const credential = require('./client-env.json');

let authRouter = require('./routes/authGuard').router;
let customersRouter = require('./routes/customers');

let app = express();

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API for KAWA CRM',
    version: '1.0.0',
    externalDocs: {
      description: "swagger.json",
      url: "/swagger.json"
    },
    description:
        'This is a REST API application made with Express. It retrieves data from KAWA CRM.',
    contact: {
      name: '25 rue dépot Arras',
      url: 'https://epsi.fr',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./routes/*.js'],
};
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerSpec = swaggerJSDoc(options);
const swaggerUi = require('swagger-ui-express');
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec)
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/customers', customersRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const server = app.listen(credential.port, () => {
  console.log(`App listening on port ${credential.port}`)
});


module.exports = server;
