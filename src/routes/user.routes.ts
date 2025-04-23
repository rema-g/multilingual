import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { validateRequest } from '../middleware/validateRequest.middleware';

const router = Router();

router.post('/create', validateRequest, (req, res) =>UserController.create(req, res));
router.post('/login', validateRequest, (req, res) =>UserController.login(req, res));

export default router;
