import express, { RequestHandler } from 'express';
import cors from 'cors';
import { authenticateApiKey } from './middlewares/auth';
import propertyRouter from './routes/properties';
import projectRouter from './routes/projects';
const app = express();
import * as dotenv from 'dotenv';
dotenv.config();

app.use(cors());
app.use(express.json());

app.use('/api/properties', authenticateApiKey as RequestHandler, propertyRouter);
app.use('/api/projects', authenticateApiKey as RequestHandler, projectRouter);

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
