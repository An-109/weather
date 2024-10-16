import { Router } from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
  try {
    // Extract city from request body
    const { city } = req.body;

    if (!city) {
      return res.status(400).json({ message: 'City name is required' });
    }

    // GET weather data from city name
    const request = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY`
    );

    const weatherData = await request.json();
    
    if (request.status !== 200) {
      return res.status(request.status).json({ message: weatherData.message });
    }

    // Save city to search history
    HistoryService.saveCity(city);

    // Send weather data response
    res.json(weatherData);

  } catch (error) {
    res.status(500).json({ message: 'Error fetching weather data' });
  }
});

// GET search history
router.get('/history', (req, res) => {
  try {
    const history = HistoryService.getHistory();
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching search history' });
  }
});


// TODO: GET search history


// * BONUS TODO: DELETE city from search history


export default router;
