import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const ATLAS_URI = process.env.ATLAS_URI || ''; // Изменили на ATLAS_URI

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(ATLAS_URI); // Убрали параметры useNewUrlParser и useUnifiedTopology
      console.log('MongoDB connected');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      process.exit(1); // Если ошибка подключения, завершаем приложение
    }
  };
  

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
