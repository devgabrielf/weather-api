import axios from 'axios';
import AppError from '../errors/AppError';

interface IRequest {
  city: string;
  lat: string;
  lon: string;
}

interface IResponse {
  temperature: number;
  humidity: number;
  status: string;
}

export default class FetchWeatherDataService {
  public async execute({ city, lat, lon }: IRequest): Promise<IResponse> {
    try {
      const queryParams = city ? `q=${city}` : `lat=${lat}&lon=${lon}`;

      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?${queryParams}&appid=255b8ad08cec759a73eaba1f41d56013`,
      );

      const temperature = Math.round(data.main.temp - 273.15);
      const { humidity } = data.main;

      const alerts = [];

      if (humidity < 30) {
        alerts.push('Umidade baixa');
      }

      if (temperature > 30) {
        alerts.push('Risco de ensolação');
      } else if (temperature < 10) {
        alerts.push('Frio intenso');
      }

      const status = alerts.length
        ? alerts.join(' e ')
        : 'Nenhum risco eminente';

      return { temperature, humidity, status };
    } catch (err) {
      throw new AppError('Cidade não encontrada', 404);
    }
  }
}
