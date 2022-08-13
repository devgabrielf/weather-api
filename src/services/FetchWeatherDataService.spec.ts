import FetchWeatherDataService from './FetchWeatherDataService';
import axios from 'axios';
import AppError from '../errors/AppError';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

let fetchWeatherData: FetchWeatherDataService;

describe('FetchWeatherDataService', () => {
  beforeEach(() => {
    fetchWeatherData = new FetchWeatherDataService();
  });

  it('should return correct status alerts', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        main: {
          temp: 294,
          humidity: 51,
        },
      },
    });

    let data = await fetchWeatherData.execute({
      city: 'Belo Horizonte',
      lat: undefined,
      lon: undefined,
    });

    expect(data).toEqual({
      temperature: 21,
      humidity: 51,
      status: 'Nenhum risco eminente',
    });

    mockedAxios.get.mockResolvedValueOnce({
      data: {
        main: {
          temp: 282,
          humidity: 28,
        },
      },
    });

    data = await fetchWeatherData.execute({
      city: undefined,
      lat: '-19.9208',
      lon: '-43.9378',
    });

    expect(data).toEqual({
      temperature: 9,
      humidity: 28,
      status: 'Umidade baixa e Frio intenso',
    });

    mockedAxios.get.mockResolvedValueOnce({
      data: {
        main: {
          temp: 304,
          humidity: 51,
        },
      },
    });

    data = await fetchWeatherData.execute({
      city: 'Belo Horizonte',
      lat: undefined,
      lon: undefined,
    });

    expect(data).toEqual({
      temperature: 31,
      humidity: 51,
      status: 'Risco de ensolação',
    });
  });

  it('should not return data if the provided city was not found', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error());

    await expect(
      fetchWeatherData.execute({
        city: 'non-existing-city',
        lat: undefined,
        lon: undefined,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
