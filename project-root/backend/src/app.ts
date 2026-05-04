// backend/src/app.ts

// Ski-bi dibby dib yo da dub dub
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';
import errorHandler from './middlewares/errorMiddleware';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import authRoutes from './routes/authRoutes';
import cartRoutes from './routes/cartRoutes';
import unsplashRoutes from './routes/unsplashRoutes';

dotenv.config();
// Yo da dub dub
const app = express();
const PORT = process.env.PORT || 5000;
const ATLAS_URI = process.env.ATLAS_URI || '';


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
  apis: ['./src/routes/productRoutes.ts', './src/routes/userRoutes.ts', './src/routes/authRoutes.ts'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// Middleware
// Ba-da-ba-da-ba-be bop bop bodda bope
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(express.json());
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/unsplash', unsplashRoutes);
app.use(errorHandler); // LAST!

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Bop ba bodda bope
const connectDB = async () => {
    try {
      const conn = await mongoose.connect(ATLAS_URI);
      console.log('MongoDB connected');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      process.exit(1);
    }
  };
  

connectDB();

// Dibby dib yo da 
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Swagger UI available at http://localhost:5000/api-docs');
});

// Bada bing bada boom