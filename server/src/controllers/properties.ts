import { Request, Response } from 'express';
import { Property } from '../types/property';


const properties: Property[] = [];

export const createProperty = (req: Request, res: Response):void => {
    
  const property: Property = req.body;
  if (!property.projectId || !property.title || !property.size || !property.price || !property.handoverDate) {
    res.status(400).json({ message: 'All fields are required' });
   }
  
  properties.push(property);
  res.status(201).json(property);
};