import { Router } from 'express';
import subjectRoutes from './subject.routes';
import userRoutes from './user.routes'

const router = Router();

router.use('/subjects', subjectRoutes);
router.use('/users', userRoutes)
export default router;
