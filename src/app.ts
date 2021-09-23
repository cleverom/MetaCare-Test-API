import createError, { HttpError } from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import indexRouter from './routes/index';
import swaggerDocs from './swagger.json';

// const swaggerOptions = {
//   swaggerDefinition: {
//     info: {
//       title: 'MetaCare API',
//       version: '1.0.0',
//     },
//   },
//   apis: [`${__dirname}/dist/routes/index.js`],
// };

dotenv.config();
let app = express();


// console.log(swaggerDocs);
// view engine setup

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use('/', indexRouter);





// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;


//complete swagger setup
//conect to database
//complete implementation of API
// dockerize application
// deploy application
//write unit test for the endpoints using jest and supertest
