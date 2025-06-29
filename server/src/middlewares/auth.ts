import { Request, Response, NextFunction } from 'express';

export const authenticateApiKey = (req: Request, res: Response, next: NextFunction): Response | void => {
  const apiKey = req.headers['x-api-key'];
    
  if (!process.env.API_KEY) {
     res.status(500).json({ message: 'Server misconfiguration' });
  }

  if (!apiKey || apiKey !== process.env.API_KEY) {
     res.status(401).json({ message: 'Unauthorized Acesss' });
  }
  
  next();
};