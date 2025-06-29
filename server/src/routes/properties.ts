import { Router } from 'express';
import { createProperty } from '../controllers/properties';

const router = Router();

router.post('/', createProperty);

export default router;