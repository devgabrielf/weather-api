import { Request, Response } from 'express';
import AppError from '../errors/AppError';

import FetchWeatherDataService from '../services/FetchWeatherDataService';

export default class WeatherController {
  public async fetch(request: Request, response: Response): Promise<Response> {
    const city = <string>request.query.city;
    const lat = <string>request.query.lat;
    const lon = <string>request.query.lon;

    if (!(city || lat || lon)) {
      throw new AppError('Informe o nome da cidade ou usuas coordenadas');
    }

    if (city && (lat || lon)) {
      throw new AppError(
        'Informe somente o nome da cidade ou usuas coordenadas',
      );
    }

    if ((lat && !lon) || (!lat && lon)) {
      throw new AppError('Informe tanto a latitude quanto a longitude');
    }

    const fetchWeatherDataService = new FetchWeatherDataService();

    const data = await fetchWeatherDataService.execute({
      city,
      lat,
      lon,
    });

    return response.json(data);
  }
}
