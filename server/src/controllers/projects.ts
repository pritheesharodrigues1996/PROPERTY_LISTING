import { Request, Response } from 'express';

export const getProjects = (req: Request, res: Response) => {
  const projects = [
    { id: 'proj_1', name: 'Downtown Towers' },
    { id: 'proj_2', name: 'Marina Residences' }
  ];
  
  res.json(projects);
};