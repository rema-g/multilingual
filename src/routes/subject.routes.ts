import { Router } from 'express';
import { SubjectController } from '../controllers/subject.controller';
import { validateRequest } from '../middleware/validateRequest.middleware';
import { validateSession } from '../middleware/auth.middleware';

const router = Router();

// Apply validateSession middleware to all routes
router.use(validateSession);

router.get('/', validateRequest, SubjectController.get);
router.post('/', validateRequest, SubjectController.create);
router.get('/:id', validateRequest, SubjectController.getById);
router.put('/:id', validateRequest, SubjectController.update);
router.delete('/:id', validateRequest, SubjectController.remove);
router.delete('/:id/translations/:language_code', validateRequest, SubjectController.removeTranslation);

export default router;
