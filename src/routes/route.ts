import { Router } from 'express';
import subjectRoutes from './subject.routes';

const router = Router();

router.use('/subjects', subjectRoutes);

export default router;
