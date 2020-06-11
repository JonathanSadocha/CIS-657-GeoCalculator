import axios from 'axios';
import { key } from './key';

const weatherServer = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/weather',

  //api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={your api key}
});

weatherServer.interceptors.request.use(
  async (config) => {
    // called when request is made.
    config.headers.Accept = 'application/json';
    // const token = await AsyncStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (err) => {
    // called when error
    return Promise.reject(err);
  }
);

//getVideos lat, lon,
export const getWeather = async (lon, lat, callback) => {
  const response = await weatherServer.get(
    `?appid=${key}&lat=${lat}&lon=${lon}&units=imperial`
    //`?lat=${lat}&lon=${lon}&appid=${key}`
  )
  callback(response.data);
};

export default weatherServer;