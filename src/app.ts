import createError, { HttpError } from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import db from "./models";

import movies from './routes/index';

// swagger definitions
const swaggerOptions = {
  swaggerDefinition: {
      info: {
        title: 'MetaCare API',
        version: '1.0.0',
        description: 'API for movies and comments with statistics',
      },
      host: 'localhost:4000',
      basePath: '/api/movies',
      components: {
          securitySchemes: {
              BasicAuth: {
                  type: "http",
                  scheme: "basic"
              }
          }
      },
      security: {
          basicAuth: []
      },
      openapi: "3.0.0",
  },
  apis: [`${__dirname}/routes/index.js`],
}


dotenv.config();
let app = express();

db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
  });

// console.log(swaggerDocs);
// view engine setup

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// const swaggerDocs = swaggerJsDoc(swaggerOptions);
// app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));


app.use('/api/movies', movies);





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
  res.send(err.message);
});

export default app;