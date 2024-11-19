// src/app.ts

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';
import errorHandler from './middlewares/errorMiddleware';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const ATLAS_URI = process.env.ATLAS_URI || ''; // Изменили на ATLAS_URI

// !!! SWAGGER !!!

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API documentation',
    },
  },
  apis: ['./src/routes/productRoutes.ts', './src/routes/userRoutes.ts'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.use(errorHandler); // LAST!

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
