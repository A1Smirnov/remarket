import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const unsplashRoutes = express.Router();

// Ваш ключ API Unsplash
const API_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

unsplashRoutes.get('/random-photos', async (req, res) => {
  try {
    const response = await axios.get('https://api.unsplash.com/photos/random', {
      headers: {
        Authorization: `Client-ID ${API_KEY}`, // Ваш ключ API в заголовке
      },
      params: {
        query: 'shopping, store, marketplace',
        orientation: 'landscape',
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching photos from Unsplash', error });
  }
});

export default unsplashRoutes;
