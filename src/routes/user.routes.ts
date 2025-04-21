import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { wrapController } from '../utils/wrapController';

const router = Router();

router.post('/create', (req, res) =>UserController.create(req, res));
router.post('/login', (req, res) =>UserController.login(req, res));

export default router;
