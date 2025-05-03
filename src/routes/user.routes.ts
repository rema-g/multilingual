import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { validateSession } from '../middleware/auth.middleware';

const router = Router();

router.post('/register', UserController.create);
router.post('/login', UserController.login);
router.post('/logout', validateSession, UserController.logout);

export default router;
