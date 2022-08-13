import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import swaggerFile from './swagger.json';
import AppError from './errors/AppError';
import WeatherController from './controllers/WeatherController';

const app = express();

const weatherController = new WeatherController();

app.get('/weather', weatherController.fetch);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen('3333', () => {
  console.log('Server is running on port 3333');
});
